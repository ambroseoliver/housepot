export function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:8000"
  ).replace(/\/+$/, "");
}

export async function readApiError(response: Response) {
  const payload: unknown = await response.json().catch(() => null);
  if (typeof payload === "string") return payload;
  if (typeof payload !== "object" || payload === null) {
    return `Request failed with status ${response.status}.`;
  }

  const detail = Reflect.get(payload, "detail") ?? Reflect.get(payload, "message");
  if (typeof detail === "string") return detail;

  const collectMessages = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(collectMessages);
    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .filter(([key]) => key !== "status")
        .flatMap(([, nested]) => collectMessages(nested));
    }
    return [];
  };
  const messages = collectMessages(
    Reflect.get(payload, "errors") ?? payload,
  );
  return messages.length
    ? messages.join(" ")
    : `Request failed with status ${response.status}.`;
}
