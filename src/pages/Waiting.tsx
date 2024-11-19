import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useToast } from "../hooks/useToast";
import PlayerRow from "../components/PlayerRow";
import Button from "../components/Button";
import useSetPlayerStatus from "../services/useSetPlayerStatus";
import useLockGame from "../services/useLockGame";
import { setPlayerReadyStatus } from "../store/slices/user.slice";
import { setIsLocked } from "../store/slices/game.slice";
import "../styles/waitingPage.scss";

const WaitingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameId = useSelector((state: RootState) => state.user.gameId);
  const players = useSelector((state: RootState) => state.players.playerList);
  const isPlayerReady = useSelector((state: RootState) => state.user.isReady);
  const isPlayerAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const isGameLocked = useSelector((state: RootState) => state.game.isLocked);

  const setPlayerStatus = useSetPlayerStatus();
  const lockGame = useLockGame();
  const toast = useToast();
  const gameLink = `${window.origin}/join/${gameId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(gameLink);
    toast?.success("Copied Link");
  };

  const readyButtonText = useMemo(() => {
    if (!isPlayerReady) return "Ready !";
    return "Not Ready !";
  }, [isPlayerReady]);

  const lockButtonText = useMemo(() => {
    if (isGameLocked) return "Unlock game";
    return "Lock game";
  }, [isGameLocked]);

  const handleToggleReady = () => {
    setPlayerStatus(
      {
        status: !isPlayerReady,
      },
      {
        onSuccess: (res) => {
          if (res.data.success) {
            dispatch(setPlayerReadyStatus(!isPlayerReady));
          }
        },
      }
    );
  };

  const handleToogleLock = () => {
    lockGame(
      {
        status: !isGameLocked,
      },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            dispatch(setIsLocked(!isGameLocked));
            navigate("/lock");
          }
        },
      }
    );
  };

  return (
    <div className="waiting__container">
      <h1 className="waiting__title">Sequence</h1>
      <div className="waiting__container__form">
        <span className="waiting__gameLink__label">
          Game Link -{" "}
          <span className="waiting__gameLink__link" onClick={handleCopyLink}>
            {gameLink}
          </span>
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span className="waiting__nameInput__label">Players</span>
          {players.map((player) => (
            <PlayerRow playerId={player} key={player} />
          ))}
        </div>
        <div className="waiting__container__button">
          <div>
            <Button
              label="Exit game"
              onClick={handleToggleReady}
              disabled={isGameLocked}
              size="small"
            />
          </div>
          <div>
            <Button
              label={readyButtonText}
              onClick={handleToggleReady}
              disabled={isGameLocked}
              size="small"
            />
            {isPlayerAdmin && (
              <Button
                label={lockButtonText}
                onClick={handleToogleLock}
                size="small"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
