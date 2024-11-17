import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AddPlayer, PlayersList } from "../types/playersSlice.types";
import { toTitleCase } from "../../utils/toProperCase";

export interface PlayersState {
  players: {
    [playerId: string]: {
      id: string;
      name: string;
      isOnline: boolean;
      teamId: string;
      isAdmin: boolean;
    };
  };
  playerList: string[];
}

const initialState: PlayersState = {
  players: {},
  playerList: [],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setInitalPlayerList: (state, action: PayloadAction<PlayersList>) => {
      Object.values(action.payload).forEach((player) => {
        if (!state.players[player.id]) {
          state.players[player.id] = {
            id: player.id,
            isAdmin: player.isAdmin,
            isOnline: player.isOnline,
            name: toTitleCase(player.name),
            teamId: player?.teamId || "",
          };
        }
        if (!state.playerList.includes(player.id)) {
          state.playerList.push(player.id);
        }
      });
    },
    addPlayer: (state, action: PayloadAction<AddPlayer>) => {
      const playerId = action.payload.id;
      if (!state.players?.[playerId]) {
        state.players[playerId] = {
          id: playerId,
          isAdmin: action.payload.isAdmin,
          isOnline: action.payload.isOnline,
          name: toTitleCase(action.payload.name),
          teamId: action.payload.teamId || "",
        };
        if (!state.playerList.includes(playerId)) {
          state.playerList.push(playerId);
        }
      }
    },
  },
});

export const { addPlayer, setInitalPlayerList } = playersSlice.actions;

export default playersSlice.reducer;
