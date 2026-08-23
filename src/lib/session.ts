import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  bearerToken?: string;
  role?: string;
  [key: string]: string | undefined;
}

const password = process.env.SESSION_PASSWORD ?? process.env.IRON_SESSION_PASSWORD;

if (!password || password.length < 32) {
  console.warn(
    "[session] SESSION_PASSWORD not set or too short - using dev fallback. Set a 32+ char SESSION_PASSWORD in .env.local for production"
  );
}

export const sessionOptions = {
  password:
    password && password.length >= 32
      ? password
      : "complex_password_at_least_32_characters_long_dev_only",
  cookieName: "nsm_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
