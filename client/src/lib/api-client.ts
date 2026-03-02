const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface ApiError {
  error: string;
  status: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

const DEFAULT_TIMEOUT = 10000;

const MAX_RETRIES = 3;

const BASE_DELAY = 1000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = DEFAULT_TIMEOUT,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

function getBackoffDelay(attempt: number): number {
  return Math.min(BASE_DELAY * Math.pow(2, attempt), 10000);
}

function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

import { useAuthStore } from "@/lib/auth-store";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  config: { retries?: number; timeout?: number; token?: string } = {},
): Promise<ApiResponse<T>> {
  const { retries = MAX_RETRIES, timeout = DEFAULT_TIMEOUT } = config;
  const url = `${API_BASE_URL}${endpoint}`;

  const store = useAuthStore.getState();
  const token = config.token || store.token;
  const tenantId = store.activeTenantId;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    (defaultHeaders as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  if (tenantId) {
    (defaultHeaders as Record<string, string>)["X-Tenant-ID"] = tenantId;
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let lastError: ApiError | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions, timeout);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        if (isRetryable(response.status) && attempt < retries) {
          await new Promise((resolve) =>
            setTimeout(resolve, getBackoffDelay(attempt)),
          );
          continue;
        }

        return {
          data: null,
          error: {
            error: errorBody.error || `HTTP ${response.status}`,
            status: response.status,
            details: errorBody,
          },
        };
      }

      const json = await response.json();

      // Handle the new backend `{ message, data }` response wrapper
      const unwrappedData = "data" in json ? json.data : json;

      return { data: unwrappedData, error: null };
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          lastError = {
            error: "Request timed out",
            status: 408,
          };
        } else {
          lastError = {
            error: err.message || "Network error",
            status: 0,
          };
        }
      }

      if (attempt < retries) {
        await new Promise((resolve) =>
          setTimeout(resolve, getBackoffDelay(attempt)),
        );
        continue;
      }
    }
  }

  return {
    data: null,
    error: lastError || { error: "Request failed", status: 0 },
  };
}

export const api = {
  get: <T>(endpoint: string, config?: { timeout?: number; token?: string }) =>
    apiClient<T>(endpoint, { method: "GET" }, config),

  post: <T>(
    endpoint: string,
    body?: unknown,
    config?: { timeout?: number; token?: string },
  ) =>
    apiClient<T>(
      endpoint,
      { method: "POST", body: JSON.stringify(body) },
      config,
    ),

  put: <T>(
    endpoint: string,
    body?: unknown,
    config?: { timeout?: number; token?: string },
  ) =>
    apiClient<T>(
      endpoint,
      { method: "PUT", body: JSON.stringify(body) },
      config,
    ),

  delete: <T>(
    endpoint: string,
    config?: { timeout?: number; token?: string },
  ) => apiClient<T>(endpoint, { method: "DELETE" }, config),
};

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
