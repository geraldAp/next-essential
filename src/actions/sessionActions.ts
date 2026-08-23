"use server";

import { getSession } from "@/lib/session";
import { COOKIE_KEYS } from "@/lib/utils/constants";

export async function setBearerToken(token: string) {
  const session = await getSession();
  session.bearerToken = token;
  // also mirror under constant key for backwards compat / generic access
  (session as any)[COOKIE_KEYS.BEARER_KEY] = token;
  await session.save();
}

export async function setSession(key: string, value: string) {
  const session = await getSession();
  (session as any)[key] = value;
  await session.save();
}

export async function getBearerToken(): Promise<string | undefined> {
  const session = await getSession();
  return session.bearerToken ?? (session as any)[COOKIE_KEYS.BEARER_KEY];
}

export async function getSessionValue(key: string): Promise<string | undefined> {
  const session = await getSession();
  return (session as any)[key];
}

export async function getSessionData() {
  const session = await getSession();
  return {
    bearerToken: session.bearerToken,
    role: session.role,
  };
}

export async function clearSession() {
  const session = await getSession();
  session.destroy();
}
