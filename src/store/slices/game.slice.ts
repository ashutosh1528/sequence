import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GameSliceState {
  isLocked: boolean;
  isStarted: boolean;
}

const initialState = {
  isLocked: false,
  isStarted: false,
};
export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action?.payload || false;
    },
    setIsStarted: (state, action: PayloadAction<boolean>) => {
      state.isStarted = action?.payload || false;
    },
    clearGame: (state) => {
      state.isLocked = false;
    },
  },
});

export const { setIsLocked, clearGame, setIsStarted } = GameSlice.actions;
export default GameSlice.reducer;
