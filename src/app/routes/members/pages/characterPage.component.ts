import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Character } from '../interfaces/character.interface';
import { LocalStorage } from '../interfaces';
import { getClassColor } from '../utils/class-color.util';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './characterPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharacterPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public character = signal<Character | null>(null);

  public mythicPlusScores = computed(() =>
    this.character()?.mythic_plus_scores_by_season?.[0] ?? null
  );

  public mythicPlusBestRuns = computed(() =>
    this.character()?.mythic_plus_best_runs ?? []
  );

  constructor() {
    const { region, realm, name } = this.activatedRoute.snapshot.params;
    if (!region || !realm || !name) {
      this.redirectToMembers();
      return;
    }

    const characterKey = `character:${region}&${realm}&${name}`;
    const characterData = this.getFromLocalStorage<Character>(characterKey);

    if (!characterData) {
      this.redirectToMembers();
      return;
    }

    this.character.set(characterData);
  }

  private getFromLocalStorage<T>(key: string): T | null {
    const rawData = localStorage.getItem(key);
    return rawData ? (JSON.parse(rawData) as LocalStorage<T>)?.value ?? null : null;
  }

  private redirectToMembers() {
    this.router.navigate(['/members']);
  }

  public getClassColor(): string {
    return getClassColor(this.character());
  }
}
