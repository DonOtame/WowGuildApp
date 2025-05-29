import { CharacterDetails, CLASS_COLORS } from '../interfaces';

export function getClassColor(character: CharacterDetails | null): string {
  if (!character) return '#FFF'; // Color por defecto si no hay personaje
  return CLASS_COLORS[character.class || '#FFF'];
}
