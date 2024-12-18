import { Socket, io } from "socket.io-client";

const socket: Socket = io("https://api.ashutoshagrawal.dev", {
  path: "/sequence/socket.io",
  autoConnect: false,
});
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

export default socket;
