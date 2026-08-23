import { getSession } from "@/lib/session";
import LogoutClient from "./LogoutClient";

export const dynamic = "force-dynamic";

export default async function LogoutPage() {
  const session = await getSession();
  session.destroy();

  return <LogoutClient />;
}
