"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearStorage } from "@/lib/utils/storage";
import { useUserStore } from "@/store/userStore";

export default function LogoutClient() {
  const router = useRouter();

  useEffect(() => {
    // clear client storage
    clearStorage();
    try {
      useUserStore.getState().clearUser();
    } catch {}
    // also clear legacy keys explicitly
    try {
      localStorage.removeItem("user-storage");
    } catch {}
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <p className="text-sm text-muted-foreground">Signing out…</p>
    </div>
  );
}
