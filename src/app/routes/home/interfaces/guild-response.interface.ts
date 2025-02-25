import { BaseGuild } from "@core/interfaces";

export interface GuildResponse extends BaseGuild {
    raid_rankings: RAIDRankings;
    raid_progression: RAIDProgression;
    raid_encounters: RAIDEncounter[];
}

export interface RAIDEncounter {
    slug: string;
    name: string;
    defeatedAt: Date;
}

export interface RAIDProgression {
    [raidName: string]: RAIDProgressionSummary;
}

export interface RAIDProgressionSummary {
    summary: string;
    total_bosses: number;
    normal_bosses_killed: number;
    heroic_bosses_killed: number;
    mythic_bosses_killed: number;
}

export interface RAIDRankings {
    [raidName: string]: RAIDRankingsSummary;
}


export interface RAIDRankingsSummary {
    normal: Summary;
    heroic: Summary;
    mythic: Summary;
}

export interface Summary {
    world: number;
    region: number;
    realm: number;
}
