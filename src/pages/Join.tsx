import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../components/Button";
import useJoinGame from "../services/useJoinGame";
import "../styles/joinPage.scss";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import { useToast } from "../hooks/useToast";

const JoinPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { gameId } = useParams();
  const joinGame = useJoinGame();
  const [userGameId, setUserGameId] = useState(gameId || "");
  const [playerName, setPlayerName] = useState("");
  const getTitle = () => {
    if (gameId) {
      return "Welcome to the game !";
    }
    return "Ready to join the fun ?";
  };

  const getLabel = () => {
    if (gameId) {
      return "Game ID : ";
    }
    return "Enter Game ID : ";
  };

  const handleGameIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameId) {
      setUserGameId(e?.target?.value);
    }
  };

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e?.target?.value);
  };

  const isFormValid = () => {
    return Boolean(userGameId && playerName);
  };

  const handleJoinGame = () => {
    if (isFormValid()) {
      joinGame(
        { gameId: userGameId, playerName },
        {
          onSuccess: (res) => {
            Cookies.set(GAME_ID_COOKIE, userGameId, {
              secure: true,
              sameSite: "Strict",
            });
            Cookies.set(PLAYER_ID_COOKIE, res.data.playerId, {
              secure: true,
              sameSite: "Strict",
            });
            toast?.success("Game created successfully !");
            navigate("/waiting");
          },
          // onError
        }
      );
    }
  };

  return (
    <div className="join__container">
      <h1 className="join__title">Sequence</h1>
      <div className="join__container__form">
        <span className="join__titleText">{getTitle()}</span>
        <div style={{ display: "flex" }}>
          <span className="join__nameInput__label">{getLabel()}</span>
          <input
            className="join__nameInput"
            placeholder="Type here"
            value={userGameId}
            onChange={handleGameIdChange}
            disabled={!!gameId}
          />
        </div>
        <div style={{ display: "flex" }}>
          <span className="join__nameInput__label">Enter your name : </span>
          <input
            className="join__nameInput"
            placeholder="Type here"
            value={playerName}
            onChange={handlePlayerNameChange}
          />
        </div>
        <div className="join__createGameButton">
          <Button
            label="Join game"
            onClick={handleJoinGame}
            disabled={!isFormValid()}
          />
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
