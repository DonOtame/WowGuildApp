import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import {
  CharacterDetails,
  MythicPlusScores,
  MythicPlusBestRuns,
  LocalStorage,
} from '../interfaces';
import { CharacterService } from '../services/character.service';
import { getClassColor } from '../utils/class-color.util';

@Component({
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './characterPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharacterPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private characterService = inject(CharacterService);

  public character = signal<CharacterDetails | null>(null);

  public mythicPlusScores = signal<MythicPlusScores[] | null>([]);
  public mythicPlusCurrenScores = signal<MythicPlusScores | null>(null);

  public mythicPlusBestRuns = signal<MythicPlusBestRuns[]>([]);

  constructor() {
    const { region, realm, name } = this.activatedRoute.snapshot.params;
    if (!region || !realm || !name) {
      this.redirectToMembers();
      return;
    }

    const characterKey = `character:${region}&${realm}&${name}`;
    const characterDetails =
      this.getFromLocalStorage<CharacterDetails>(characterKey);

    if (!characterDetails) {
      this.redirectToMembers();
      return;
    }

    console.log;
    this.character.set(characterDetails);

    this.mythicPlusScores.set(
      this.getFromLocalStorage<MythicPlusScores[]>(
        `${characterKey}:mythicPlusScores`
      )
    );

    this.mythicPlusCurrenScores.set(this.mythicPlusScores()?.[0] || null);

    this.mythicPlusBestRuns.set(
      this.getFromLocalStorage<MythicPlusBestRuns[]>(
        `${characterKey}:mythicPlusBestRuns`
      ) || []
    );

    if (this.mythicPlusBestRuns()?.length === 0 && this.character()) {
      this.characterService
        .getCharacterMythicPlusBestRuns(this.character()!)
        .subscribe({
          next: (runs) => {
            this.mythicPlusBestRuns.set(runs);
          },
          error: (error) => {
            console.error('Error fetching Mythic Plus best runs:', error);
            this.mythicPlusBestRuns.set([]);
          },
        });
    }
  }

  private getFromLocalStorage<T>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    return rawData
      ? (JSON.parse(rawData) as LocalStorage<T>)?.value ?? null
      : null;
  }

  private redirectToMembers() {
    this.router.navigate(['/members']);
  }

  public getClassColor(): string {
    return getClassColor(this.character());
  }
}
