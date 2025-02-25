import { ChangeDetectionStrategy, Component, computed, inject, input, signal, OnInit } from '@angular/core';
import { RAIDEncounter } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { SlugFormatPipe } from '@shared/pipes/slug-format.pipe';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { IOImageService } from '@shared/services/IOImage.service';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'raid-encounters',
  imports: [CommonModule, SlugFormatPipe, TranslatePipe, SpinnerComponent],
  templateUrl: './raid-encounters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaidEncountersComponent implements OnInit {
  private IOImageService = inject(IOImageService);

  public raidEncounters = input.required<RAIDEncounter[]>();

  public isLoading = signal<boolean>(true);

  public sortedRaidEncounters = computed(() => {
    return [...this.raidEncounters()].sort(
      (a, b) => new Date(b.defeatedAt).getTime() - new Date(a.defeatedAt).getTime()
    );
  });

  public ngOnInit(): void {
    if (this.raidEncounters().length > 0) {
      setTimeout(() => {
        this.isLoading.set(false); 
      }, 250);
    }
  }

  public getEncounterImage(encounterSlug: string): string {
    return this.IOImageService.getEncounterImage(encounterSlug);
  }

  public onImageError(event: Event): void {
    this.IOImageService.onImageError(event);
  }
}
