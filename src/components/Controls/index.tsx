import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import "./index.scss";
import { RootState } from "../../store";
import useEndPlayerTurn from "../../services/useEndPlayerTurn";

const Controls = () => {
  const endPlayerTurn = useEndPlayerTurn();
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const currentTurnPlayerId = useSelector(
    (state: RootState) => state.game.playerTurnId
  );
  const [isMyTurn, setIsMyTurn] = useState(
    selfPlayerId === currentTurnPlayerId
  );

  useEffect(() => {
    setIsMyTurn(selfPlayerId === currentTurnPlayerId);
  }, [selfPlayerId, currentTurnPlayerId]);

  const handleEndTurn = () => {
    endPlayerTurn({});
  };
  return (
    <div className="controls__container">
      <Button label="Discard card" disabled={!isMyTurn} />
      <Button label="End turn " disabled={!isMyTurn} onClick={handleEndTurn} />
    </div>
  );
};

export default Controls;
