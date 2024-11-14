import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:9000", { autoConnect: false });
socket.on("playerJoined", (data) => {
  console.log(data);
});
export const socketId = socket.id;

export default socket;
