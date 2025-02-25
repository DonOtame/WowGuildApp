import { ActiveSpecRole, Class, Faction, Gender, MythicPlusBestRun, MythicPlusScoresBySeason, Region } from ".";


export interface CharacterSummary {
    name: string;
    region: Region;
    realm: string;
}
export interface Character extends CharacterSummary {
    race: string;
    class: Class;
    active_spec_name: string | null;
    active_spec_role: ActiveSpecRole | null;
    gender: Gender;
    faction?: Faction;
    achievement_points: number;
    last_crawled_at: Date;
    profile_url: string;
    profile_banner: string;
    thumbnail_url?: string;
    use_animated_banner?: boolean;
    mythic_plus_scores_by_season?: MythicPlusScoresBySeason[];
    mythic_plus_best_runs?: MythicPlusBestRun[];
}

export interface MythicPlusData {
    mythicPlusScores: MythicPlusScoresBySeason[];
    mythicPlusBestRuns: MythicPlusBestRun[];
}

