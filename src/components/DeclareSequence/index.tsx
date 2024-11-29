import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { RootState } from "../../store";
import {
  clearPotentialSequence,
  removeBoardCellsHighlights,
  setIsDeclaringSequence,
} from "../../store/slices/game.slice";

const DeclareSequence = () => {
  const dispatch = useDispatch();
  const isDeclaringSequence = useSelector(
    (state: RootState) => state.game.isDeclaringSequence
  );
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const potentialSequence = useSelector(
    (state: RootState) => state.game.potentialSequence
  );
  const currentTurnPlayerId = useSelector(
    (state: RootState) => state.game.playerTurnId
  );
  const [buttonText, setButtonText] = useState("Declare Sequence ?");

  const handleDeclareSequence = () => {
    if (!isDeclaringSequence) {
      dispatch(setIsDeclaringSequence(true));
      dispatch(removeBoardCellsHighlights());
      setButtonText("Check Sequence");
    } else {
      // API call
      console.log(potentialSequence);
      dispatch(clearPotentialSequence());
      dispatch(setIsDeclaringSequence(false));
      setButtonText("Declare Sequence ?");
    }
  };

  return (
    <div>
      <div>
        <Button
          label={buttonText}
          width={220}
          onClick={handleDeclareSequence}
          disabled={currentTurnPlayerId !== selfPlayerId}
        />
      </div>
    </div>
  );
};

export default DeclareSequence;
