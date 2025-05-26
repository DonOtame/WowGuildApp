import { inject, Injectable, signal } from '@angular/core';
import { RAIDRankings, RAIDProgression, RAIDEncounter } from '../interfaces';
import { GuildService } from './guild.service';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  private guildService = inject(GuildService);

  public raidRankings = signal<RAIDRankings | null>(null);
  public raidProgression = signal<RAIDProgression | null>(null);
  public raidEncounters = signal<RAIDEncounter[]>([]);

  constructor() {
    this.guildService.getGuildResponse().subscribe((guild) => {
      this.raidEncounters.set(guild.raid_encounters);
      this.raidProgression.set(guild.raid_progression);
      this.raidRankings.set(guild.raid_rankings);
    });
  }
}
