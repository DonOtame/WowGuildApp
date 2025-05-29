export interface MythicPlusBestRuns {
  dungeon: string;
  shortName: string;
  mythicLevel: number;
  completedAt: Date;
  clearTimeMs: number;
  keystoneRunId: number;
  parTimeMs: number;
  numKeystoneUpgrades: number;
  mapChallengeModeId: number;
  zoneId: number;
  zoneExpansionId: number;
  iconUrl: string;
  backgroundImageUrl: string;
  score: number;
  url: string;
  affixes: Affix[];
}

export interface Affix {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
}
