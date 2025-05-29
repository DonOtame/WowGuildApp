import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  computed,
} from '@angular/core';
import { SlugFormatPipe } from '@shared/pipes/slug-format.pipe';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IOImageService } from '@shared/services/IOImage.service';
import { RaidDefeats, RaidEncounter } from '../../interfaces';

@Component({
  selector: 'raid-encounters',
  imports: [CommonModule, SlugFormatPipe, TranslatePipe],
  templateUrl: './raid-encounters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaidEncountersComponent {
  private IOImageService = inject(IOImageService);

  public raidEncounters = input.required<RaidEncounter[]>();

  public sortedRaidEncounters = computed(() => {
    return [...this.raidEncounters()].sort((a, b) => {
      const getLatestDefeat = (defeats: RaidDefeats): number => {
        return Math.max(
          ...Object.values(defeats || {})
            .filter((d) => !!d)
            .map((d) => new Date(d!).getTime())
        );
      };

      return getLatestDefeat(b.defeats) - getLatestDefeat(a.defeats);
    });
  });

  public onImageError(event: Event): void {
    this.IOImageService.onImageError(event);
  }
}
