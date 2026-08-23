"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useSocketStore } from "@/store/socketStore";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const externalId = useUserStore((s) => s.externalId);
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    if (externalId) {
      connect( externalId);
    }

    return () => {
      disconnect();
    };
  }, [externalId, connect, disconnect]);

  return <>{children}</>;
};

export default SocketProvider;
