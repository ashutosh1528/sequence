import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { addPlayer } from "../../store/slices/players.slice";
import { useToast } from "../../hooks/useToast";

type JoinType = {
  gameId: string;
  playerId: string;
};
const useSocket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  socket.on("playerJoined", (data) => {
    dispatch(
      addPlayer({
        ...data,
      })
    );
  });

  const createGameEvent = ({ gameId, playerId }: JoinType) => {
    socket.connect();
    socket.emit(
      "createGameRoom",
      {
        gameId,
        playerId,
      },
      () => {
        toast?.success("Game created successfully !");
        navigate("/waiting");
      }
    );
  };

  const joinGameEvent = ({ gameId, playerId }: JoinType) => {
    socket.connect();
    socket.emit(
      "joinGameRoom",
      {
        gameId,
        playerId,
      },
      () => {
        toast?.success("Game joined successfully !");
        navigate("/waiting");
      }
    );
  };

  return { createGameEvent, joinGameEvent };
};

export default useSocket;
