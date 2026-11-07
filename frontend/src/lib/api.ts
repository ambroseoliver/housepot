export function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
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

  const messages = Object.values(payload).flatMap((value) =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [],
  );
  return messages.length
    ? messages.join(" ")
    : `Request failed with status ${response.status}.`;
}
