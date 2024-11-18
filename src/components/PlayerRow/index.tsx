import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WaitingGif from "../../assets/waitingGif.svg";
import KickOut from "../../assets/kickOut.svg";
import ReadyTick from "../../assets/readyTick.svg";
import "./index.scss";

type PlayerRowProps = {
  playerId: string;
};
const PlayerRow = ({ playerId }: PlayerRowProps) => {
  const player = useSelector(
    (state: RootState) => state.players.players[playerId] || {}
  );
  const isLoggedInplayerAdmin = useSelector(
    (state: RootState) => state.user.isAdmin
  );

  const getStatusImage = () => {
    if (player.isReady) return ReadyTick;
    return WaitingGif;
  };

  if (Object.keys(player).length === 0) return null;
  return (
    <div className="playerRow__container">
      <div>{player.name}</div>
      <div>
        <img className="playerRow__waitingLoader" src={getStatusImage()} />
        {isLoggedInplayerAdmin && (
          <img className="playerRow__kickOut" src={KickOut} />
        )}
      </div>
    </div>
  );
};

export default PlayerRow;
