import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { COLORS, SetTeamsType } from "../types/teamSlice.types";

export interface TeamState {
  teams: {
    [teamId: string]: {
      id: string;
      players: string[];
      score: number;
      color: COLORS;
    };
  };
  score: Record<string, number>;
  teamColorMapper: Record<string, COLORS>;
}

const initialState: TeamState = {
  teams: {},
  score: {},
  teamColorMapper: {},
};

export const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<SetTeamsType>) => {
      const getColor = (color: string) => {
        if (color === "RED") return COLORS.RED;
        if (color === "GREEN") return COLORS.GREEN;
        if (color === "BLUE") return COLORS.BLUE;
        return COLORS.RED;
      };
      Object.values(action?.payload).forEach((team) => {
        state.teams[team?.id] = { ...team, color: getColor(team.color) };
        state.score[team?.id] = team.score;
        state.teamColorMapper[team?.id] = getColor(team.color);
      });
    },
    clearTeams: (state) => {
      state.teams = {};
    },
  },
});

export const { setTeams, clearTeams } = teamSlice.actions;
export default teamSlice.reducer;
