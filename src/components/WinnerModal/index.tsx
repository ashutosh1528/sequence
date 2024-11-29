import { useDispatch, useSelector } from "react-redux";
import Score from "../Score";
import Button from "../Button";
import { RootState } from "../../store";
import { setIsWinnerModalOpen } from "../../store/slices/game.slice";
import "./index.scss";

const WinnerModal = () => {
  const dispatch = useDispatch();
  const modalData = useSelector((state: RootState) => state.game.winnerModal);
  const playerId = useSelector((state: RootState) => state.user.playerId);
  const isPlayerAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const playerTeamId = useSelector(
    (state: RootState) => state.players.players[playerId]?.teamId
  );

  const closeModal = () => {
    dispatch(setIsWinnerModalOpen({ isOpen: false, winnerTeamId: "" }));
  };

  const getTitle = () => {
    if (modalData.winnerTeamId === playerTeamId) return "You Won !!";
    return "You Lost";
  };

  const handleEndGame = () => {
    // api call
    // clear redux
    // socket disconnect
    // navigate to home
    closeModal();
  };

  const handleRestartGame = () => {
    // reset board
    // score
    // inital game
    closeModal();
  };

  return (
    <div>
      {modalData.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-title">{getTitle()}</div>
            <Score />
            {isPlayerAdmin && (
              <div style={{ marginTop: 16 }}>
                <Button label="Restart" onClick={handleRestartGame} />
                <Button label="End Game" onClick={handleEndGame} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerModal;
