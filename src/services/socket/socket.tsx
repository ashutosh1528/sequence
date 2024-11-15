import { createContext, useContext, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { addPlayer } from "../../store/slices/players.slice";
import { useToast } from "../../hooks/useToast";

type JoinType = {
  gameId: string;
  playerId: string;
};

interface SocketContextProps {
  createGameEvent: (data: JoinType) => void;
  joinGameEvent: (data: JoinType) => void;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Set up event listener
    socket.on("playerJoined", (data) => {
      dispatch(
        addPlayer({
          ...data,
        })
      );
    });
  }, [dispatch]);

  const createGameEvent = ({ gameId, playerId }: JoinType) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("createGameRoom", { gameId, playerId }, () => {
      toast?.success("Game created successfully!");
      navigate("/waiting");
    });
  };

  const joinGameEvent = ({ gameId, playerId }: JoinType) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("joinGameRoom", { gameId, playerId }, () => {
      toast?.success("Game joined successfully!");
      navigate("/waiting");
    });
  };

  return (
    <SocketContext.Provider value={{ createGameEvent, joinGameEvent }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
