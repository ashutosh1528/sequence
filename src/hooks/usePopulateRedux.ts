import { useDispatch } from "react-redux";
import {
  clearPlayerStore,
  setInitalPlayerList,
} from "../store/slices/players.slice";
import {
  clearUserStore,
  setInitalUserDetails,
} from "../store/slices/user.slice";
import { clearTeams, setTeams } from "../store/slices/teams.slice";
import { GetGameDetailsResponse } from "../services/useGetGameDetails";
import { clearGame, setInitalGameDetails } from "../store/slices/game.slice";

const usePopulateRedux = () => {
  const dispatch = useDispatch();

  const hydrateRedux = (data: GetGameDetailsResponse) => {
    dispatch(setInitalPlayerList(data.players));
    dispatch(
      setInitalUserDetails({
        gameId: data.gameId,
        playerId: data.playerId,
        name: data?.players[data?.playerId].name,
        isAdmin: data?.players[data?.playerId].isAdmin,
        isReady: data?.players[data?.playerId].isReady,
        isOnline: data?.players[data?.playerId].isOnline,
      })
    );
    dispatch(setInitalGameDetails(data));
    dispatch(setTeams(data.teams));
  };

  const clearRedux = () => {
    dispatch(clearPlayerStore());
    dispatch(clearUserStore());
    dispatch(clearTeams());
    dispatch(clearGame());
  };

  return { hydrateRedux, clearRedux };
};

export default usePopulateRedux;
