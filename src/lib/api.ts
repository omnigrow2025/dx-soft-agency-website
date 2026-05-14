// Centralized API client for the OmniDX Railway backend.
// Replaces Supabase data access throughout the app.

export const API_BASE = "https://omni-dx-api-production.up.railway.app";

// Cloudinary cloud name (set when known). Until provided, we render images
// using a generic fallback. If the API ever returns a full URL we pass it through.
export const CLOUDINARY_CLOUD = ""; // e.g. "omnidx" — fill in when known

const TOKEN_KEY = "omnidx_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string | null) => {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
};

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = true, headers, body, ...rest } = opts;
  const h: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string> | undefined),
  };
  if (body && !(body instanceof FormData) && !h["Content-Type"]) {
    h["Content-Type"] = "application/json";
  }
  if (auth) {
    const t = getToken();
    if (t) h["Authorization"] = `Bearer ${t}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers: h, body });
  const text = await res.text();
  let data: unknown = undefined;
  try { data = text ? JSON.parse(text) : undefined; } catch { data = text; }
  if (!res.ok) {
    const msg =
      (data as { message?: string })?.message ||
      (typeof data === "string" ? data : `Request failed (${res.status})`);
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}

// Unwrap `{ data: [...] }` or `{ data: {...} }` envelopes when present.
export function unwrap<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

// Resolve an `imageUrl` field from the API into a usable <img src>.
// - Full URL → returned as-is
// - Empty/missing → fallback placeholder
// - Cloudinary public id → prepended with the configured cloud base
export function resolveImage(value: string | null | undefined, fallback = "/placeholder.svg"): string {
  if (!value) return fallback;
  if (/^https?:\/\//i.test(value)) return value;
  if (CLOUDINARY_CLOUD) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${value}`;
  }
  return fallback;
}

// ---------- Types ----------
export interface Course {
  id: string;
  title: string;
  imageUrl?: string | null;
  level?: string | null;
  price?: number | null;
  salePrice?: number | null;
  currency?: string | null;
  duration?: number | string | null;
  type?: string | null;
  certificate?: string | null;
  description?: string | null;
  isGroup?: boolean;
  studyPlan?: { title: string; description?: string }[];
  features?: { title: string }[];
}

export interface Teacher {
  id: string;
  name: string;
  lastName?: string | null;
  email?: string | null;
  bio?: string | null;
  imageUrl?: string | null;
  phoneNumber?: string | null;
  description?: string | null;
}

export interface Partner {
  id: number;
  name: string;
  logoUrl?: string | null;
  url?: string | null;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface SupportRequest {
  id: string | number;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  status?: string;
  createdAt?: string;
}

export interface Subscriber {
  id: string | number;
  email: string;
  createdAt?: string;
}
