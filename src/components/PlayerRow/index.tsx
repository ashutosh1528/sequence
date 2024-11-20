import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { removePlayer } from "../../store/slices/players.slice";
import useKickPlayer from "../../services/useKickPlayer";
import { useSocket } from "../../services/socket/socket";
import WaitingGif from "../../assets/waitingGif.svg";
import KickOut from "../../assets/kickOut.svg";
import ReadyTick from "../../assets/readyTick.svg";
import "./index.scss";

type PlayerRowProps = {
  playerId: string;
};
const PlayerRow = ({ playerId }: PlayerRowProps) => {
  const dispatch = useDispatch();
  const { playerKickedEvent } = useSocket();
  const kickPlayer = useKickPlayer();
  const player = useSelector(
    (state: RootState) => state.players.players[playerId] || {}
  );
  const isLoggedInplayerAdmin = useSelector(
    (state: RootState) => state.user.isAdmin
  );
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const isGameLocked = useSelector((state: RootState) => state.game.isLocked);

  const isSelf = useMemo(() => {
    return player.id === selfPlayerId;
  }, [player.id, selfPlayerId]);

  const getStatusImage = () => {
    if (player.isReady) return ReadyTick;
    return WaitingGif;
  };

  const getNameClass = () => {
    if (!player.isOnline) return "--offline";
    return "";
  };

  const handleKickOut = () => {
    if (!isSelf && !isGameLocked) {
      kickPlayer(
        {
          playerId,
        },
        {
          onSuccess: (res) => {
            dispatch(removePlayer(playerId));
            playerKickedEvent(playerId);
          },
        }
      );
    }
  };

  if (Object.keys(player).length === 0) return null;
  return (
    <div className="playerRow__container">
      <div style={{ display: "flex" }}>
        <span className={`playerRow__name${getNameClass()}`}>
          {player.name}
        </span>
        {player.isAdmin && <div className="playerRow__adminChip">Admin</div>}
        {!player.isOnline && (
          <div className="playerRow__adminChip">Offline</div>
        )}
      </div>
      <div>
        <img className="playerRow__waitingLoader" src={getStatusImage()} />
        {isLoggedInplayerAdmin && (
          <img
            className={`playerRow__kickOut ${
              isSelf ? "playerRow__kickOut__self" : ""
            }`}
            src={KickOut}
            onClick={handleKickOut}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerRow;
