"use server";

import { apiRequest } from "@/lib/api/apiHandler";
import { ADMIN_API_ROUTES } from "@/lib/utils/routes";
import { setBearerToken, setSession } from "./sessionActions";
import { COOKIE_KEYS } from "@/lib/utils/constants";
import { MOCK_LOGIN } from "@/lib/utils/mock";
import type { AxiosError } from "axios";

export interface AdminLoginData {
  email: string;
  password: string;
}

export async function adminLogin(data: AdminLoginData) {
  const { email, password } = data;

  // --- mock simulation (toggle via MOCK_LOGIN.ENABLE_MOCK) ---
  if (MOCK_LOGIN.ENABLE_MOCK) {
    // simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    if (
      email === MOCK_LOGIN.VALID_EMAIL &&
      password === MOCK_LOGIN.VALID_PASSWORD
    ) {
      await setBearerToken(MOCK_LOGIN.MOCK_TOKEN);
      await setSession(COOKIE_KEYS.ROLE_KEY, MOCK_LOGIN.MOCK_ROLE);
      return {
        ok: true as const,
        data: {
          data: {
            bearerToken: MOCK_LOGIN.MOCK_TOKEN,
            role: MOCK_LOGIN.MOCK_ROLE,
          },
        },
      };
    }
    return {
      ok: false as const,
      error: {
        response: {
          status: 401,
          data: { message: "Invalid email or password (mock)" },
        },
        message: "Invalid email or password",
      } as AxiosError,
    };
  }

  const response = await apiRequest<{
    data: { bearerToken: string; role: string };
  }>({
    method: "post",
    url: ADMIN_API_ROUTES.LOGIN_ADMIN,
    data: { email, password },
    opts: { skipAuth: true },
  });

  if (response.ok) {
    const { bearerToken: token, role } = response.data.data;
    await setBearerToken(token);
    await setSession(COOKIE_KEYS.ROLE_KEY, role);
  }

  return response;
}
