export interface MembersResponse {
  rank: number;
  character: Character;
}

export interface Character {
  name: string;
  region: string;
  realm: string;
}
