import { Component, computed, inject, input } from '@angular/core';
import {
  RaidProgressionResponse,
  RaidRankingsResponse,
} from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IOImageService } from '@shared/services/IOImage.service';
import { environment } from '@env/environment';

@Component({
  selector: 'raid-rankings',
  templateUrl: './raid-rankings.component.html',
  imports: [CommonModule, TranslatePipe],
})
export class RaidRankingsResponseComponent {
  private IOImageService = inject(IOImageService);

  public RaidRankingsResponse = input.required<RaidRankingsResponse>();
  public RaidProgressionResponse = input.required<RaidProgressionResponse>();

  public raidKeys = computed(() => {
    const rankings = this.RaidRankingsResponse();
    if (!rankings || !environment.currentRaid) return [];

    const filteredKeys = Object.keys(rankings).filter(
      (raidKey) =>
        raidKey === environment.currentRaid ||
        raidKey === environment.previousRaid
    );

    return filteredKeys.sort((a, b) => {
      if (a === environment.currentRaid) return -1;
      if (b === environment.currentRaid) return 1;
      return 0;
    });
  });

  public raidsRanking = computed(() => {
    const rankings = this.RaidRankingsResponse();
    if (!rankings) return {};

    return this.raidKeys().reduce((acc, raidKey) => {
      acc[raidKey] = rankings[raidKey];
      return acc;
    }, {} as Record<string, RaidRankingsResponse[string]>);
  });

  public raidsProgression = computed(() => {
    const progression = this.RaidProgressionResponse();
    if (!progression) return {};

    return this.raidKeys().reduce((acc, raidKey) => {
      acc[raidKey] = progression[raidKey];
      return acc;
    }, {} as Record<string, RaidProgressionResponse[string]>);
  });

  public onImageError(event: Event): void {
    this.IOImageService.onImageError(event);
  }
}
