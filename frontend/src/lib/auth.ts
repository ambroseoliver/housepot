"use client";

import { getApiBaseUrl, readApiError } from "./api";

const ACCESS_TOKEN_KEY = "housepot.accessToken";
const REFRESH_TOKEN_KEY = "housepot.refreshToken";

type AuthResponse = {
  access: string;
  refresh?: string;
  role?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getToken(payload: unknown, key: "access" | "refresh") {
  if (!isRecord(payload)) return null;
  const user = isRecord(payload.user) ? payload.user : null;
  const value =
    payload[key] ??
    payload[`${key}_token`] ??
    user?.[key] ??
    user?.[`${key}_token`];
  return typeof value === "string" && value.length ? value : null;
}

function getRole(payload: unknown) {
  if (!isRecord(payload)) return undefined;
  const user = isRecord(payload.user) ? payload.user : null;
  const role =
    payload.role ??
    payload.user_role ??
    payload.user_type ??
    user?.role ??
    user?.user_role ??
    user?.user_type;
  return typeof role === "string" ? role.toLowerCase() : undefined;
}

function saveAuth(payload: unknown): AuthResponse | null {
  const access = getToken(payload, "access");
  if (!access) return null;

  const refresh = getToken(payload, "refresh") ?? undefined;
  sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh) sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);

  return { access, refresh, role: getRole(payload) };
}

async function postAuth(path: string, values: Record<string, string>) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) throw new Error(await readApiError(response));
  return response.json() as Promise<unknown>;
}

export function getAccessToken() {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearAuth() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function signIn(email: string, password: string) {
  const payload = await postAuth("/api/users/login/", { email, password });
  const auth = saveAuth(payload);
  if (!auth) throw new Error("The login response did not include an access token.");
  return auth;
}

export async function registerAccount(
  values: {
    name: string;
    email: string;
    phone: string;
    password: string;
  },
  role: "landlord" | "tenant",
) {
  const registration = await postAuth("/api/users/register/", {
    full_name: values.name,
    email: values.email,
    phone_number: values.phone,
    password: values.password,
    role,
  });

  const auth = saveAuth(registration);
  if (auth) return auth;

  return signIn(values.email, values.password);
}
