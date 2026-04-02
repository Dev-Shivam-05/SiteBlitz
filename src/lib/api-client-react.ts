import * as React from "react";
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

export type ApiClient = {
  baseUrl: string;
  get<T>(path: string): Promise<ApiResult<T>>;
  post<T>(path: string, body: unknown): Promise<ApiResult<T>>;
};

function createDefaultClient(baseUrl: string): ApiClient {
  const normalize = (p: string) => (p.startsWith("/") ? p : `/${p}`);

  async function request<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<ApiResult<T>> {
    try {
      const res = await fetch(`${baseUrl}${normalize(path)}`, {
        method,
        headers: { "content-type": "application/json" },
        body: method === "POST" ? JSON.stringify(body ?? {}) : undefined,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        return { ok: false, error: text || `HTTP ${res.status}` };
      }

      const contentType = res.headers.get("content-type") || "";
      const data = (contentType.includes("application/json") ? await res.json() : await res.text()) as T;
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Network error" };
    }
  }

  return {
    baseUrl,
    get: <T,>(path: string) => request<T>("GET", path),
    post: <T,>(path: string, body: unknown) => request<T>("POST", path, body),
  };
}

const ApiClientContext = React.createContext<ApiClient | null>(null);

export function ApiClientProvider(props: { children: React.ReactNode; baseUrl?: string; client?: ApiClient }) {
  const baseUrl = props.baseUrl ?? (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";
  const client = React.useMemo(() => props.client ?? createDefaultClient(baseUrl), [props.client, baseUrl]);
  return React.createElement(ApiClientContext.Provider, { value: client }, props.children);
}

export function useApiClient(): ApiClient {
  const client = React.useContext(ApiClientContext);
  if (client) return client;
  // Safe fallback for apps that haven't wired the provider yet.
  return createDefaultClient((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "");
}

// Generic query/mutation helpers (mirrors typical monorepo "api-client-react" ergonomics)
export function useApiQuery<T>(
  key: unknown[],
  path: string,
  options?: Omit<UseQueryOptions<ApiResult<T>>, "queryKey" | "queryFn">
) {
  const api = useApiClient();
  return useQuery<ApiResult<T>>({
    queryKey: key,
    queryFn: () => api.get<T>(path),
    ...options,
  });
}

export function useApiMutation<T, V = unknown>(
  path: string,
  options?: Omit<UseMutationOptions<ApiResult<T>, unknown, V>, "mutationFn">
) {
  const api = useApiClient();
  return useMutation<ApiResult<T>, unknown, V>({
    mutationFn: (vars) => api.post<T>(path, vars),
    ...options,
  });
}

// App-friendly defaults that keep the UI "alive" even without a backend.
export function useHealthQuery() {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => ({ ok: true as const, data: { status: "ok" } }),
    staleTime: 60_000,
  });
}

