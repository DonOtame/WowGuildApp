import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Character, MembersResponse } from '../../interfaces';

@Component({
  selector: 'characters-list',
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './characters-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent {
  public members = input.required<MembersResponse[]>();

  public charactersSummary = computed<Character[]>(() => {
    return this.members().map((member) => {
      return member.character;
    });
  });
}
