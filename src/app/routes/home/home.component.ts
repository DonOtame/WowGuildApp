import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RaidEncountersComponent } from './components/raid-encounters/raid-encounters.component';
import { RaidRankingsResponseComponent } from './components/raid-rankings/raid-rankings.component';
import { HomeStateService } from './services/ home-state.service';

@Component({
  imports: [CommonModule, RaidRankingsResponseComponent, RaidEncountersComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {
  private homeStateService = inject(HomeStateService);

  public RaidRankingsResponse = this.homeStateService.raidRankingsResponse;
  public RaidProgressionResponse = this.homeStateService.raidProgressionResponse;
  public raidEncounters = this.homeStateService.raidEncounters;
}
