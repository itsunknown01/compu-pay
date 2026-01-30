/**
 * API Client Configuration
 *
 * Connects directly to the backend server.
 * Auth tokens are stored in memory and passed via Authorization header.
 */

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

/**
 * Default fetch timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 10000;

/**
 * Maximum retry attempts for failed requests
 */
const MAX_RETRIES = 3;

/**
 * Base delay for exponential backoff (ms)
 */
const BASE_DELAY = 1000;

/**
 * Fetch with timeout support
 */
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

/**
 * Calculate exponential backoff delay
 */
function getBackoffDelay(attempt: number): number {
  return Math.min(BASE_DELAY * Math.pow(2, attempt), 10000);
}

/**
 * Check if error is retryable
 */
function isRetryable(status: number): boolean {
  return status === 429 || status >= 500;
}

import { useAuthStore } from "@/lib/auth-store";

// ... (existing imports/constants)

/**
 * API Client for making requests to the backend server
 *
 * Features:
 * - Automatic timeout handling
 * - Retry with exponential backoff
 * - Consistent error handling
 * - Authorization header support
 * - Automatic Tenant Context injection
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  config: { retries?: number; timeout?: number; token?: string } = {},
): Promise<ApiResponse<T>> {
  const { retries = MAX_RETRIES, timeout = DEFAULT_TIMEOUT } = config;
  const url = `${API_BASE_URL}${endpoint}`;

  // Get auth state from store if not provided in config
  // This allows clean hooks without manually passing token/tenant every time
  const store = useAuthStore.getState();
  const token = config.token || store.token;
  const tenantId = store.activeTenantId;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add Authorization header
  if (token) {
    (defaultHeaders as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  // Add Tenant Context header
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

      const data = await response.json();
      return { data, error: null };
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

/**
 * Convenience methods for common HTTP verbs
 */
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

/**
 * Get the API base URL (for direct backend calls)
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
