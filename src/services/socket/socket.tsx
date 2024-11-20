import { createContext, useContext, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import socket from "../socket";
import {
  addPlayer,
  clearPlayerStore,
  removePlayer,
  setOnlineStatus,
  setReadyStatus,
} from "../../store/slices/players.slice";
import { useToast } from "../../hooks/useToast";
import useNavigateToHome from "../../hooks/useNavigateToHome";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../../constants";
import { clearUserStore } from "../../store/slices/user.slice";
import { setIsLocked } from "../../store/slices/game.slice";
import { setTeams } from "../../store/slices/teams.slice";

type JoinType = {
  gameId: string;
  playerId: string;
};

interface SocketContextProps {
  createGameEvent: (data: JoinType) => void;
  joinGameEvent: (data: JoinType) => void;
  playerOfflineEvent: () => void;
  playerOnlineEvent: () => void;
  playerKickedEvent: (id: string) => void;
  playerExitEvent: () => void;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const gameId = Cookies.get(GAME_ID_COOKIE) || "";
  const playerId = Cookies.get(PLAYER_ID_COOKIE) || "";
  const dispatch = useDispatch();
  const navigateToHome = useNavigateToHome();
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
    socket.on("playerRemovedEmit", (data) => {
      const isSelf = playerId === (data?.playerId || "");
      if (isSelf) {
        dispatch(clearPlayerStore());
        dispatch(clearUserStore());
        socket.disconnect();
        navigateToHome();
      } else {
        dispatch(removePlayer(data?.playerId || ""));
      }
    });
    socket.on("gameLockStatus", (data) => {
      dispatch(setIsLocked(data?.status));
      if (data?.status === true) navigate("/lock");
      else if (data?.status === false) navigate("/waiting");
    });
    socket.on("teamsCreated", (data) => {
      dispatch(setTeams(data?.teams || {}));
    });
  }, [dispatch, playerId]);

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
      socket.emit(
        "markPlayerOnlineStatus",
        {
          playerId,
          gameId,
          status: false,
        },
        () => {
          socket.disconnect();
        }
      );
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

  const playerKickedEvent = (playerIdToKick: string) => {
    socket.emit("playerRemoved", { playerId: playerIdToKick, gameId });
  };

  const playerExitEvent = () => {
    socket.emit("exitGame", { gameId, playerId });
  };

  return (
    <SocketContext.Provider
      value={{
        createGameEvent,
        joinGameEvent,
        playerOnlineEvent,
        playerOfflineEvent,
        playerKickedEvent,
        playerExitEvent,
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
