import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user.slice";
import playersSliceReducer from "./slices/players.slice";
import gameSliceReducer from "./slices/game.slice";
import teamsSliceReducer from "./slices/teams.slice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    players: playersSliceReducer,
    game: gameSliceReducer,
    teams: teamsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
