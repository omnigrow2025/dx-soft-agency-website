import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch, getToken, setToken } from "@/lib/api";

interface AuthContextType {
  token: string | null;
  user: { email?: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Login endpoint guesses — first one to succeed wins. The Railway API's
// auth path wasn't documented at integration time, so we try a few common
// shapes. If your API uses a different path, update LOGIN_CANDIDATES.
const LOGIN_CANDIDATES = [
  "/api/auth/login",
  "/api/auth/sign-in",
  "/api/admin/auth/login",
  "/api/admin/login",
  "/api/login",
];

function decodeJwtEmail(token: string): string | undefined {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.email || payload.sub;
  } catch {
    return undefined;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken());
  const [user, setUser] = useState<{ email?: string } | null>(
    token ? { email: decodeJwtEmail(token) } : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) setUser({ email: decodeJwtEmail(token) });
    else setUser(null);
  }, [token]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    let lastErr: Error | null = null;
    try {
      for (const path of LOGIN_CANDIDATES) {
        try {
          const res = await apiFetch<{
            token?: string;
            accessToken?: string;
            access_token?: string;
            data?: { token?: string; accessToken?: string };
          }>(path, {
            method: "POST",
            auth: false,
            body: JSON.stringify({ email, password }),
          });
          const t =
            res.token ||
            res.accessToken ||
            res.access_token ||
            res.data?.token ||
            res.data?.accessToken;
          if (t) {
            setToken(t);
            setTokenState(t);
            return;
          }
          lastErr = new Error(`Login at ${path} returned no token`);
        } catch (e) {
          // 404 → try next candidate; other errors → remember and continue
          lastErr = e as Error;
          if ((e as { status?: number }).status && (e as { status?: number }).status !== 404) {
            // Real auth error (e.g. 401) — surface immediately
            throw e;
          }
        }
      }
      throw lastErr ?? new Error("No login endpoint matched");
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setToken(null);
    setTokenState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, user, isAdmin: !!token, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
