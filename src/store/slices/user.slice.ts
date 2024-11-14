import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetInitalDetails } from "../types/userSlice.types";

export interface UserState {
  gameId: string;
  playerId: string;
}

const initialState: UserState = {
  gameId: "",
  playerId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitalUserDetails: (state, action: PayloadAction<GetInitalDetails>) => {
      state.gameId = action.payload.gameId || "";
      state.playerId = action.payload.playerId || "";
    },
  },
});

export const { setInitalUserDetails } = userSlice.actions;

export default userSlice.reducer;
