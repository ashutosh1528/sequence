import { Socket, io } from "socket.io-client";

const socket: Socket = io("http://localhost:9000", { autoConnect: false });

export default socket;
