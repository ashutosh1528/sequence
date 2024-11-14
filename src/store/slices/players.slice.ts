import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AddPlayer } from "../types/playersSlice.types";
import { toTitleCase } from "../../utils/toProperCase";

export interface playersState {
  [playerId: string]: {
    id: string;
    name: string;
    isOnline: boolean;
    teamId: string;
    isAdmin: boolean;
  };
}

const initialState: playersState = {};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<AddPlayer>) => {
      if (!state?.[action.payload.id]) {
        state[action.payload.id] = {
          id: action.payload.id,
          isAdmin: action.payload.isAdmin,
          isOnline: action.payload.isOnline,
          name: toTitleCase(action.payload.name),
          teamId: action.payload.teamId || "",
        };
      }
    },
  },
});

export const { addPlayer } = playersSlice.actions;

export default playersSlice.reducer;
