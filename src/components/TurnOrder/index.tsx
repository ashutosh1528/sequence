import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { COLORS } from "../../store/types/teamSlice.types";
import "./index.scss";

const TurnOrder = () => {
  const order = useSelector(
    (state: RootState) => state.game.playerTurnSequence
  );
  const players = useSelector((state: RootState) => state.players.players);
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const playerTurnId = useSelector(
    (state: RootState) => state.game.playerTurnId
  );
  const teamColorMapper = useSelector(
    (state: RootState) => state.teams.teamColorMapper
  );

  const getMyTurnClass = (id: string) => {
    if (id === playerTurnId) return "--turn";
    return "";
  };

  const getNameColor = (playerId: string, teamId: string) => {
    if (playerId === playerTurnId) {
      const color = teamColorMapper[teamId];
      if (color === COLORS.BLUE) return "blue";
      if (color === COLORS.GREEN) return "green";
      if (color === COLORS.RED) return "red";
    }
    return "black";
  };

  return (
    <div className="turnOrder__container">
      <span className="turnOrder__title">Turn order</span>
      <div className="turnOrder__container__order">
        {order.map((player) => {
          return (
            <div className="turnOrder__container__name">
              <div
                className={`turnOrder__name${getMyTurnClass(player)}`}
                style={{ color: getNameColor(player, players[player].teamId) }}
              >
                {players[player].name}
              </div>
              {player === selfPlayerId && (
                <div className="turnOrder__youChip">You</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TurnOrder;
