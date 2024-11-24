import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { COLORS } from "../../store/types/teamSlice.types";
import "./index.scss";

const Score = () => {
  const teams = useSelector((state: RootState) => state.teams.teams);

  const getTeamColorClass = (teamColor: COLORS) => {
    if (teamColor === COLORS.BLUE) return "--blue";
    if (teamColor === COLORS.RED) return "--red";
    if (teamColor === COLORS.GREEN) return "--green";
  };
  return (
    <div className="score__container">
      <span className="score__title">Scoreboard</span>
      <table>
        <thead>
          {Object.values(teams).map((team) => {
            return (
              <th className={`score__heading${getTeamColorClass(team.color)}`}>
                Team {team.color}
              </th>
            );
          })}
        </thead>
        <tbody>
          <tr>
            {Object.values(teams).map((team) => {
              return <td className="score__score">{team.score}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Score;
