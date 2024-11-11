import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../components/Button";
import "../styles/createPage.scss";
import useCreateGame from "../services/useCreateGame";
import { useToast } from "../hooks/useToast";

const CreatePage = () => {
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
              Cookies.set("gameId", res.data.gameId, {
                secure: true,
                sameSite: "Strict",
              });
              Cookies.set("playerId", res.data.playerId, {
                secure: true,
                sameSite: "Strict",
              });
              toast?.success("Game created successfully !");
              navigate("/waiting");
            }
          },
          // onError code !
        }
      );
      console.log("Call the API !");
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
