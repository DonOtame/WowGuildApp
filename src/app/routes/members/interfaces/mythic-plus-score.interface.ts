export interface MythicPlusScores {
  season: string;
  isCurrentSeason: boolean;
  segments: Segments;
}

export interface Segments {
  all: ScoreDetails;
  dps: ScoreDetails;
  healer: ScoreDetails;
  tank: ScoreDetails;
}

export interface ScoreDetails {
  score: number;
  color: string;
}
