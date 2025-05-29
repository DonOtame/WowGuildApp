import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  Character,
  CharacterDetails,
  MythicPlusScores,
} from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { CharacterService } from '../../services/character.service';
import { RouterLink } from '@angular/router';
import { getClassColor } from '../../utils/class-color.util';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'character-card',
  imports: [CommonModule, TranslatePipe, RouterLink, SpinnerComponent],
  templateUrl: './character-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardComponent implements OnInit {
  private characterService = inject(CharacterService);

  public characterSummary = input.required<Character>();

  public character = signal<CharacterDetails | null>(null);
  public mythicPlusScores = signal<MythicPlusScores[] | null>(null);
  public isLoading = signal<boolean>(true);

  ngOnInit(): void {
    const summary = this.characterSummary();
    if (!summary) return;

    this.isLoading.set(true);

    forkJoin({
      character: this.characterService.getCharacterDetails(summary),
      scores: this.characterService.getCharacterMythicPlusScores(summary),
    }).subscribe({
      next: ({ character, scores }) => {
        this.character.set(character);
        this.mythicPlusScores.set(scores);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading character data', err);
        this.isLoading.set(false);
      },
    });
  }

  public getClassColor(): string {
    return getClassColor(this.character());
  }
}
