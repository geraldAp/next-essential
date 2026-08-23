import { create } from "zustand";
import { Socket } from "socket.io-client";
import { connectSocket } from "@/lib/api/socket";
import axios from "axios";


interface SocketState {
  socket: Socket | null;
  socketId: string | null;
  connect: (externalId: string) => void;
  isConnected: boolean;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  socket: null,
  socketId: null,
  isConnected: false,
  connect: ( externalId: string) => {
    // start connection process
    const socket = connectSocket();
    // connect to socket
    socket.connect();

    // listen to connection
    socket.on("connect", () => {
      set({ isConnected: true });
    });
    // listen and act on connection error
    socket.on("error", (error) => {
      throw new Error("❌ WebSocket error:", error);
    });
    // listen to the custom connected event from the socket server
    socket.on("CONNECTED", async (data: { data?: { socketId?: string } }) => {
      // set socket id and update the users socketId to match the new one
      if (data?.data?.socketId) {
        set({ socketId: data.data.socketId });
        try {
          await updateSocketIdOnServer(externalId, data.data.socketId);
        } catch (error) {}
      }
    });

    set({ socket });
  },

  disconnect: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      return { socket: null, socketId: null, isConnected: false };
    });
  },
}));

const updateSocketIdOnServer = async (userId: string, socketId: string) => {
  const API_UPDATE_SOCKET_ID = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/admins/${userId}/socket-id`;
  if (!socketId) {
    return;
  }
  const data = { socketId };
  try {
    const response = await axios.put(API_UPDATE_SOCKET_ID, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`❌ Server error: ${response.status}`);
    }
  } catch (error) {}
};
