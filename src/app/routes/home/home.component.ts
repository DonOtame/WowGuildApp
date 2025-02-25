import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaidRankingsComponent } from './components/raid-rankings/raid-rankings.component';
import { RAIDEncounter, RAIDProgression, RAIDRankings } from './interfaces';
import { GuildService } from './services/guild.service';
import { RaidEncountersComponent } from "./components/raid-encounters/raid-encounters.component";

@Component({
  imports: [CommonModule, RaidRankingsComponent, RaidEncountersComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent {

  private guildService = inject(GuildService);

  public raidRankings = signal<RAIDRankings | null>(null);
  public raidProgression = signal<RAIDProgression | null>(null);
  public raidEncounters = signal<RAIDEncounter[]>([]);

  constructor() {
    this.guildService.getGuildResponse()
      .subscribe((guild) => {
        this.raidEncounters.set(guild.raid_encounters);
        this.raidProgression.set(guild.raid_progression);
        this.raidRankings.set(guild.raid_rankings);
      });
  }
}
