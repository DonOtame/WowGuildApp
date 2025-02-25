import { Component, computed, inject, input } from '@angular/core';
import { RAIDProgression, RAIDProgressionSummary, RAIDRankings, RAIDRankingsSummary } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IOImageService } from '@shared/services/IOImage.service';

@Component({
  selector: 'raid-rankings',
  templateUrl: './raid-rankings.component.html',
  imports: [CommonModule, TranslatePipe],
})
export class RaidRankingsComponent {

  private IOImageService = inject(IOImageService);

  public raidRankings = input.required<RAIDRankings>();
  public raidProgression = input.required<RAIDProgression>();

  public raidKeys = computed(() => {
    const rankings = this.raidRankings();
    return rankings ? Object.keys(rankings) : [];
  });

  public raidsRanking = computed(() => {
    const rankings = this.raidRankings();
    if (!rankings) return {};

    return this.raidKeys().reduce((acc, raidKey) => {
      acc[raidKey] = rankings[raidKey];
      return acc;
    }, {} as Record<string, RAIDRankingsSummary>);
  });

  public raidsProgression = computed(() => {
    const progression = this.raidProgression();
    if (!progression) return {};

    return this.raidKeys().reduce((acc, raidKey) => {
      acc[raidKey] = progression[raidKey];
      return acc;
    }, {} as Record<string, RAIDProgressionSummary>);
  });

  public getRaidImage(raidKey: string): string {
    return this.IOImageService.getRaidImage(raidKey);
  }

  public onImageError(event: Event): void {
    this.IOImageService.onImageError(event);
  }

}
