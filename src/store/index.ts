import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/user.slice";
import playersSliceReducer from "./slices/players.slice";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    players: playersSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
