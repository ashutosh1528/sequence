import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { addPlayer } from "../../store/slices/players.slice";

const useSocket = (socket: Socket) => {
  const dispatch = useDispatch();
  socket.on("playerJoined", (data) => {
    console.log(data);
    dispatch(
      addPlayer({
        ...data,
      })
    );
  });
};

export default useSocket;
