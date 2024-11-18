import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useToast } from "../hooks/useToast";
import PlayerRow from "../components/PlayerRow";
import Button from "../components/Button";
import useSetPlayerStatus from "../services/useSetPlayerStatus";
import { setPlayerReadyStatus } from "../store/slices/user.slice";
import "../styles/waitingPage.scss";

const WaitingPage = () => {
  const dispatch = useDispatch();
  const gameId = useSelector((state: RootState) => state.user.gameId);
  const players = useSelector((state: RootState) => state.players.playerList);
  const isPlayerReady = useSelector((state: RootState) => state.user.isReady);
  const setPlayerStatus = useSetPlayerStatus();
  const toast = useToast();
  const gameLink = `${window.origin}/join/${gameId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(gameLink);
    toast?.success("Copied Link");
  };

  const buttonText = useMemo(() => {
    if (!isPlayerReady) return "Ready !";
    return "Not Ready :(";
  }, [isPlayerReady]);

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
        <div className="waiting__waitingGameButton">
          <Button
            label={buttonText}
            onClick={handleToggleReady}
            // disabled={playerName.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
