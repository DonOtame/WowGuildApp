import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RaidEncountersComponent } from './components/raid-encounters/raid-encounters.component';
import { RaidRankingsComponent } from './components/raid-rankings/raid-rankings.component';
import { HomeStateService } from './services/ home-state.service';

@Component({
  imports: [CommonModule, RaidRankingsComponent, RaidEncountersComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private homeStateService = inject(HomeStateService);

  public raidRankings = this.homeStateService.raidRankings;
  public raidProgression = this.homeStateService.raidProgression;
  public raidEncounters = this.homeStateService.raidEncounters;
}
