/**
 * @author Gerald Amankwah
 * @description Unified API request helper built on Axios. Wraps requests to return a consistent
 * success/failure shape and normalizes error payloads. Intended for use across server actions
 * and client utilities to keep network handling consistent.
 */

import type { AxiosError } from "axios";
import { redirect } from "next/navigation";
import http from "./http";
import type { AxiosRequestConfig } from "axios";
import { getSession } from "@/lib/session";

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiFailure = { ok: false; error: AxiosError };
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface ApiRequestOptions extends AxiosRequestConfig {
  skipAuth?: boolean;
}

export async function apiRequest<T = any>({
  method,
  url,
  data,
  opts = {},
}: {
  method: string;
  url: string;
  data?: any;
  opts?: ApiRequestOptions;
}): Promise<ApiResponse<T>> {
  try {
    // inject Authorization from iron-session unless skipAuth
    if (!opts.skipAuth) {
      const hasAuth =
        (opts.headers as any)?.Authorization ||
        (opts.headers as any)?.authorization;
      if (!hasAuth) {
        try {
          const session = await getSession();
          const token = session.bearerToken;
          if (token) {
            opts.headers = {
              ...(opts.headers as Record<string, string>),
              Authorization: `Bearer ${token}`,
            };
          }
        } catch {
          // getSession requires server context (cookies) - ignore on client
        }
      }
    }
    // strip our custom flag before handing to axios
    const { skipAuth: _skip, ...axiosOpts } = opts;

    const response = await http.request<T>({
      method,
      url,
      data,
      ...axiosOpts,
    });
    return { ok: true, data: response.data };
  } catch (err) {
    const axiosErr = err as AxiosError;
    if (axiosErr.response?.status === 401) {
      redirect("/logout");
    }
    return { ok: false, error: axiosErr };
  }
}
