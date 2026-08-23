import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const connectSocket = (): Socket => {
  return io(SOCKET_URL, {
    transports: ["websocket"], // Use WebSocket
    autoConnect: false, // Prevent auto-connect before authentication
  });
};
