import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { Character, CharacterSummary, MythicPlusScoresBySeason } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { CharacterService } from '../../services/character.service';
import { RouterLink } from '@angular/router';
import { getClassColor } from '../../utils/class-color.util';


@Component({
  selector: 'character-card',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './character-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {

  private characterService = inject(CharacterService);

  public characterSummary = input.required<CharacterSummary>();

  public character = signal<Character | null>(null);
  public mythicPlusScores = signal<MythicPlusScoresBySeason | null>(null);

  public ngOnInit() {
    if (!this.characterSummary()) return;


    this.characterService.getCharacterData(this.characterSummary()).subscribe(character => {
      this.character.set(character);
      this.mythicPlusScores.set(character.mythic_plus_scores_by_season![0] || null);
    });

  }

  public getClassColor(): string {
    return getClassColor(this.character());
  }

}
