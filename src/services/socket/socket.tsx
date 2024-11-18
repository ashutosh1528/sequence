import { createContext, useContext, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import socket from "../socket";
import {
  addPlayer,
  setOnlineStatus,
  setReadyStatus,
} from "../../store/slices/players.slice";
import { useToast } from "../../hooks/useToast";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../../constants";

type JoinType = {
  gameId: string;
  playerId: string;
};

interface SocketContextProps {
  createGameEvent: (data: JoinType) => void;
  joinGameEvent: (data: JoinType) => void;
  playerOfflineEvent: () => void;
  playerOnlineEvent: () => void;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";
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
    socket.on("playerReadyStatus", (data) => {
      dispatch(
        setReadyStatus({
          playerId: data?.playerId || "",
          status: data?.status || false,
        })
      );
    });
    socket.on("playerOnlineStatus", (data) => {
      dispatch(
        setOnlineStatus({
          playerId: data?.playerId || "",
          status: data?.status || false,
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

  const playerOfflineEvent = () => {
    if (playerId && gameId) {
      socket.emit("markPlayerOnlineStatus", {
        playerId,
        gameId,
        status: false,
      });
      socket.disconnect();
    }
  };

  const playerOnlineEvent = () => {
    if (!socket.connected) {
      socket.connect();
    }
    if (playerId && gameId) {
      socket.emit("markPlayerOnlineStatus", {
        playerId,
        gameId,
        status: true,
      });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        createGameEvent,
        joinGameEvent,
        playerOnlineEvent,
        playerOfflineEvent,
      }}
    >
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
