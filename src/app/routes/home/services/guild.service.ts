import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { StorageService } from '@shared/services/storage.service';
import { RaidProgressionResponse, RaidRankingsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  public getGuildProgression(): Observable<RaidProgressionResponse> {
    const storageKey = `guild:profile:${environment.params.name}:progression`;

    const cachedData =
      this.storageService.getItem<RaidProgressionResponse>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchRaidProgressionResponse();
  }

  private fetchRaidProgressionResponse(): Observable<RaidProgressionResponse> {
    const url = `${this.baseUrl}guild/raid-progressions`;
    const params = {
      ...environment.params,
    };

    return this.http.get<RaidProgressionResponse>(url, { params }).pipe(
      map((response) => {
        this.storageService.setItem(
          `guild:profile:${environment.params.name}:progression`,
          response
        );
        return response;
      })
    );
  }

  public getGuildRanking(): Observable<RaidRankingsResponse> {
    const storageKey = `guild:profile:${environment.params.name}:ranking`;

    const cachedData =
      this.storageService.getItem<RaidRankingsResponse>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchRaidRanking();
  }

  private fetchRaidRanking(): Observable<RaidRankingsResponse> {
    const url = `${this.baseUrl}guild/raid-rankings`;
    const params = {
      ...environment.params,
    };

    return this.http.get<RaidRankingsResponse>(url, { params }).pipe(
      map((response) => {
        this.storageService.setItem(
          `guild:profile:${environment.params.name}:ranking`,
          response
        );
        return response;
      })
    );
  }
}
