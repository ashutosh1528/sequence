import { useState } from "react";
import Button from "../components/Button";
import "../styles/createPage.scss";
import useCreateGame from "../services/useCreateGame";

const CreatePage = () => {
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
            console.log("success", { res });
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
