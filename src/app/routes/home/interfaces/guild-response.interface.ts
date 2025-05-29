export interface RaidProgressionResponse {
  [raidSlug: string]: RaidData;
}

export interface RaidData {
  summary: string;
  backgroundImageUrl: string;
  totalBosses: number;
  bossesKilled: RaidBossesKilled;
  raidEncounters: {
    [encounterSlug: string]: RaidEncounter;
  };
}

export interface RaidBossesKilled {
  normal: number;
  heroic: number;
  mythic: number;
}

export interface RaidEncounter {
  slug: string;
  name: string;
  bossImageUrl: string;
  defeats: RaidDefeats;
}

export interface RaidDefeats {
  normal?: string;
  heroic?: string;
  mythic?: string;
}

export interface RaidRankingsResponse {
  [raidSlug: string]: DifficultyRankings;
}

export interface DifficultyRankings {
  normal: RaidRanking;
  heroic: RaidRanking;
  mythic: RaidRanking;
}

export interface RaidRanking {
  world: number;
  region: number;
  realm: number;
}

export type GuildCharactersList = GuildCharacter[];

export interface Character {
  name: string;
  region: string;
  realm: string;
}

export interface GuildCharacter {
  rank: number;
  character: Character;
}
