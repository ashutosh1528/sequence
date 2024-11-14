import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:9000", { autoConnect: false });

export const socketId = socket.id;

export default socket;
