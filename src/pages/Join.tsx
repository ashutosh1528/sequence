import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputMask from "react-input-mask";
import Cookies from "js-cookie";
import Button from "../components/Button";
import useJoinGame from "../services/useJoinGame";
import { useSocket } from "../services/socket/socket";
import { setInitalUserDetails } from "../store/slices/user.slice";
import { addPlayer } from "../store/slices/players.slice";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import "../styles/joinPage.scss";

const JoinPage = () => {
  const dispatch = useDispatch();
  const { joinGameEvent } = useSocket();
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
      const value = e?.target?.value?.replace(/\s+/g, "").toLowerCase();
      setUserGameId(value);
    }
  };

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e?.target?.value);
  };

  const isFormValid = () => {
    const pattern = /^[a-z]{3}-[a-z]{3}-[a-z]{3}$/;
    const isGameIdInPattern = pattern.test(userGameId);
    const isGameIdValid = userGameId.length === 11 && isGameIdInPattern;
    return isGameIdValid && Boolean(playerName);
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
            Cookies.set(PLAYER_ID_COOKIE, res.data.id, {
              secure: true,
              sameSite: "Strict",
            });
            dispatch(
              setInitalUserDetails({
                gameId: res.data.gameId,
                playerId: res.data.id,
                name: res.data.name,
                isAdmin: res.data.isAdmin,
                isReady: res.data.isReady,
              })
            );
            dispatch(
              addPlayer({
                id: res.data.id,
                name: res.data.name,
                isAdmin: res.data.isAdmin,
                isOnline: res.data.isOnline,
                isReady: res.data.isReady,
              })
            );
            joinGameEvent({ gameId: userGameId, playerId: res.data.id });
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
          <InputMask
            mask={"aaa - aaa - aaa"}
            placeholder="xxx - xxx - xxx"
            maskChar=""
            className="join__nameInput"
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
