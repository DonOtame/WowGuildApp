export interface MythicPlusBestRun {
    dungeon: string;
    short_name: string;
    mythic_level: number;
    completed_at: Date;
    clear_time_ms: number;
    keystone_run_id: number;
    par_time_ms: number;
    num_keystone_upgrades: number;
    map_challenge_mode_id: number;
    zone_id: number;
    zone_expansion_id: number;
    icon_url: string;
    background_image_url: string;
    score: number;
    affixes: Affix[];
    url: string;
}

export interface Affix {
    id: number;
    name: string;
    description: string;
    icon: string;
    icon_url: string;
    wowhead_url: string;
}
