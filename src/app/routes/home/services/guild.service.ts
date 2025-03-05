import { inject, Injectable } from '@angular/core';
import { GuildResponse, RAIDEncounter, RAIDProgression, RAIDRankings } from '../interfaces/guild-response.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { StorageService } from '@shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);


  getGuildResponse(): Observable<{ raid_rankings: RAIDRankings; raid_progression: RAIDProgression; raid_encounters: RAIDEncounter[] }> {

    const storageKey = `guild:profile:${environment.params.name}`;

    const cachedData = this.storageService.getItem<{ raid_rankings: RAIDRankings; raid_progression: RAIDProgression; raid_encounters: RAIDEncounter[] }>(storageKey);

    if (cachedData) {
      return of({
        raid_rankings: cachedData.raid_rankings,
        raid_progression: cachedData.raid_progression,
        raid_encounters: cachedData.raid_encounters
      });
    }

    const url = `${this.baseUrl}guilds/profile`;
    const params = {
      ...environment.params,
      fields: `raid_progression,raid_rankings,raid_encounters:${environment.currentRaid}:${environment.difficulty}`
    };

    return this.http.get<GuildResponse>(url, { params }).pipe(
      map(response => {
        this.storageService.setItem(storageKey, {
          raid_rankings: response.raid_rankings,
          raid_progression: response.raid_progression,
          raid_encounters: response.raid_encounters
        });
        return {
          raid_rankings: response.raid_rankings,
          raid_progression: response.raid_progression,
          raid_encounters: response.raid_encounters
        };
      })
    );
  }



}
