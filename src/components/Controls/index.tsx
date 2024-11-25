import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import { RootState } from "../../store";
import useEndPlayerTurn from "../../services/useEndPlayerTurn";
import useDiscardCard from "../../services/useDiscardCard";
import "./index.scss";

const Controls = () => {
  const queryClient = useQueryClient();
  const endPlayerTurn = useEndPlayerTurn();
  const discardCard = useDiscardCard();
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const cardToPlay = useSelector((state: RootState) => state.user.cardToPlay);
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

  const handleDiscardCard = () => {
    if (cardToPlay)
      discardCard(
        {
          cardFace: cardToPlay,
        },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess) {
              queryClient.invalidateQueries({
                queryKey: ["getCards"],
                exact: false,
              });
            }
          },
        }
      );
  };
  return (
    <div className="controls__container">
      <Button
        label="Discard card"
        disabled={!isMyTurn}
        onClick={handleDiscardCard}
      />
      <Button label="End turn " disabled={!isMyTurn} onClick={handleEndTurn} />
    </div>
  );
};

export default Controls;
