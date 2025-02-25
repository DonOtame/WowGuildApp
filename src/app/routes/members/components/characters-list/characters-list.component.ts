import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Member, CharacterSummary } from '../../interfaces';

@Component({
  selector: 'characters-list',
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './characters-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersListComponent {

  public members = input.required<Member[]>();

  public charactersSummary = computed<CharacterSummary[]>(() => {
    return this.members().map((member) => {
      return member.character;
    });
  });


}
