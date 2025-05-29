import { Character, Class } from '.';

export interface CharacterDetails extends Character {
  race: string;
  class: Class;
  activeSpecName: string;
  activeSpecRole: string;
  faction: string;
  thumbnailUrl: string;
  profileUrl: string;
}
