import { inject, Injectable, signal } from '@angular/core';

import { GuildService } from './guild.service';
import {
  RaidEncounter,
  RaidProgressionResponse,
  RaidRankingsResponse,
} from '../interfaces';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  private guildService = inject(GuildService);

  public raidProgressionResponse = signal<RaidProgressionResponse | null>(null);
  public raidEncounters = signal<RaidEncounter[]>([]);
  public raidRankingsResponse = signal<RaidRankingsResponse | null>(null);

  constructor() {
    this.guildService.getGuildProgression().subscribe((progression) => {
      this.raidProgressionResponse.set(progression);

      const raid = progression[environment.currentRaid];

      this.raidEncounters.set(
        raid && raid.raidEncounters ? Object.values(raid.raidEncounters) : []
      );
    });

    this.guildService.getGuildRanking().subscribe((rankings) => {
      this.raidRankingsResponse.set(rankings);
    });
  }
}
