import { ChangeDetectionStrategy, Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { RAIDEncounter } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { SlugFormatPipe } from '@shared/pipes/slug-format.pipe';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IOImageService } from '@shared/services/IOImage.service';

@Component({
  selector: 'raid-encounters',
  imports: [CommonModule, SlugFormatPipe, TranslatePipe],
  templateUrl: './raid-encounters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaidEncountersComponent {
  private IOImageService = inject(IOImageService);

  public raidEncounters = input.required<RAIDEncounter[]>();

  public sortedRaidEncounters = computed(() => {
    return [...this.raidEncounters()].sort(
      (a, b) => new Date(b.defeatedAt).getTime() - new Date(a.defeatedAt).getTime()
    );
  });


  public getEncounterImage(encounterSlug: string): string {
    return this.IOImageService.getEncounterImage(encounterSlug);
  }

  public onImageError(event: Event): void {
    this.IOImageService.onImageError(event);
  }
}
