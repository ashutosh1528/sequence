import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface GameSliceState {
  isLocked: boolean;
}

const initialState = {
  isLocked: false,
};
export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action?.payload;
    },
    clearGame: (state) => {
      state.isLocked = false;
    },
  },
});

export const { setIsLocked, clearGame } = GameSlice.actions;
export default GameSlice.reducer;
