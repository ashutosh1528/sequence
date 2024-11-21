import { useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "../components/Button";
import useLockGame from "../services/useLockGame";
import useStartGame from "../services/useStartGame";
import "../styles/lockPage.scss";

const LockPage = () => {
  const lockGame = useLockGame();
  const startGame = useStartGame();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const players = useSelector((state: RootState) => state.players.players);
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const isSelfPlayerAdmin = useSelector(
    (state: RootState) => state.user.isAdmin
  );

  const handleToogleLock = () => {
    lockGame({
      status: false,
    });
  };

  const getPlayerNameClassName = (playerId: string) => {
    if (players[playerId].isOnline) return "lock__playerName";
    return "lock__playerName--offline";
  };

  const handleStartGame = () => {
    startGame({});
  };

  return (
    <div className="lock__container">
      <h1 className="lock__title">Sequence</h1>
      <div className="lock__container__teams">
        <span className="lock__titleText">Teams</span>
        <div>
          {Object.values(teams).map((team) => {
            return (
              <div className="lock__container__team" key={team.id}>
                <div className="lock__teamTitle">Team {team.color}</div>
                {team.players.map((player) => {
                  return (
                    <div
                      className="lock__container__player"
                      key={players[player].id}
                    >
                      <span className={getPlayerNameClassName(player)}>
                        {players[player].name}
                      </span>
                      {players[player].id === selfPlayerId && (
                        <div className="lock__adminChip">You</div>
                      )}
                      {players[player].isAdmin && (
                        <div className="lock__adminChip">Admin</div>
                      )}
                      {!players[player].isOnline && (
                        <div className="playerRow__adminChip">Offline</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {isSelfPlayerAdmin && (
          <div className="lock__container__button">
            <Button
              label="Unlock game"
              size="small"
              onClick={handleToogleLock}
            />
            <Button
              label="Start game !"
              size="small"
              onClick={handleStartGame}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LockPage;
