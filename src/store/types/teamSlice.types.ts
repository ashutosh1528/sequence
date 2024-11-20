export enum COLORS {
  "RED" = "RED",
  "GREEN" = "GREEN",
  "BLUE" = "BLUE",
}

export type SetTeamsType = {
  [teamId: string]: {
    id: string;
    players: string[];
    score: number;
    color: string;
  };
};
