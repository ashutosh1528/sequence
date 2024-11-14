import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Button from "../components/Button";
import socket from "../services/socket";
import useCreateGame from "../services/useCreateGame";
import { useToast } from "../hooks/useToast";
import { setInitalUserDetails } from "../store/slices/user.slice";
import { addPlayer } from "../store/slices/players.slice";
import { GAME_ID_COOKIE, PLAYER_ID_COOKIE } from "../constants";
import "../styles/createPage.scss";

const CreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const createGame = useCreateGame();
  const [playerName, setPlayerName] = useState("");

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleCreateGame = () => {
    if (playerName.length) {
      createGame(
        { playerName },
        {
          onSuccess: (res) => {
            if (res.data.isSuccess && res.status === 200) {
              Cookies.set(GAME_ID_COOKIE, res.data.gameId, {
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
                })
              );
              dispatch(
                addPlayer({
                  id: res.data.id,
                  name: res.data.name,
                  isAdmin: res.data.isAdmin,
                  isOnline: res.data.isOnline,
                })
              );

              socket.connect();
              socket.emit(
                "createGameRoom",
                {
                  gameId: res.data.gameId,
                  playerId: res.data.id,
                },
                () => {
                  toast?.success("Game created successfully !");
                  navigate("/waiting");
                }
              );
            }
          },
          // onError code !
        }
      );
    }
  };

  return (
    <div className="create__container">
      <h1 className="create__title">Sequence</h1>
      <div className="create__container__form">
        <span className="create__adminText">
          You will be the admin of this game !
        </span>
        <div style={{ display: "flex" }}>
          <span className="create__nameInput__label">Enter your name : </span>
          <input
            className="create__nameInput"
            placeholder="Type here"
            onChange={handlePlayerNameChange}
          />
        </div>
        <div className="create__createGameButton">
          <Button
            label="Create game"
            onClick={handleCreateGame}
            disabled={playerName.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
