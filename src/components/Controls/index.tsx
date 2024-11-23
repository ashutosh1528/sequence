import { useSelector } from "react-redux";
import Button from "../Button";
import "./index.scss";
import { RootState } from "../../store";
import { useState } from "react";

const Controls = () => {
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const currentTurnPlayerId = useSelector(
    (state: RootState) => state.game.playerTurnId
  );
  const [isMyTurn, setIsMyTurn] = useState(
    selfPlayerId === currentTurnPlayerId
  );
  return (
    <div className="controls__container">
      <Button label="Discard card" disabled={!isMyTurn} />
      <Button label="End turn " disabled={!isMyTurn} />
    </div>
  );
};

export default Controls;
