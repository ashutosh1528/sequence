import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Button from "../components/Button";
import useLockGame from "../services/useLockGame";
import "../styles/lockPage.scss";
import { setIsLocked } from "../store/slices/game.slice";

const LockPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lockGame = useLockGame();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const players = useSelector((state: RootState) => state.players.players);
  const selfPlayerId = useSelector((state: RootState) => state.user.playerId);
  const isSelfPlayerAdmin = useSelector(
    (state: RootState) => state.user.isAdmin
  );

  const handleToogleLock = () => {
    lockGame(
      {
        status: false,
      },
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            dispatch(setIsLocked(false));
            navigate("/waiting");
          }
        },
      }
    );
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
                      {players[player].name}
                      {players[player].id === selfPlayerId && (
                        <div className="lock__adminChip">You</div>
                      )}
                      {players[player].isAdmin && (
                        <div className="lock__adminChip">Admin</div>
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
              // onClick={}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LockPage;
