export interface BaseGuild {
    name: string;
    faction: string; // Si tienes un tipo `Faction`, reemplázalo aquí
    region: string;  // Si tienes un tipo `Region`, reemplázalo aquí
    realm: string;   // Si tienes un tipo `Realm`, reemplázalo aquí
    last_crawled_at: Date;
    profile_url: string;
}