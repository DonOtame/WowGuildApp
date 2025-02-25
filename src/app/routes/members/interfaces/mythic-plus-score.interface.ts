export interface MythicPlusScoresBySeason {
    season: string;
    scores: Scores;
    segments: Segments;
}

export interface Scores {
    all: number;
    dps: number;
    healer: number;
    tank: number;
    spec_0: number;
    spec_1: number;
    spec_2: number;
    spec_3: number;
}

export interface Segments {
    all: ScoreSegment;
    dps: ScoreSegment;
    healer: ScoreSegment;
    tank: ScoreSegment;
    spec_0: ScoreSegment;
    spec_1: ScoreSegment;
    spec_2: ScoreSegment;
    spec_3: ScoreSegment;
}

export interface ScoreSegment {
    score: number;
    color: string;
}
