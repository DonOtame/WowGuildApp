import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import {
  Character,
  CharacterDetails,
  MythicPlusBestRuns,
  MythicPlusScores,
} from '../interfaces';
import { StorageService } from '../../../shared/services/storage.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private getStorageKey(character: Character): string {
    return `character:${character.region}&${character.realm}&${character.name}`;
  }

  public getCharacterDetails(
    character: Character
  ): Observable<CharacterDetails> {
    const storageKey = this.getStorageKey(character);
    const cachedData =
      this.storageService.getItem<CharacterDetails>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchAndStoreCharacterDetails(character);
  }

  private fetchAndStoreCharacterDetails(
    character: Character
  ): Observable<CharacterDetails> {
    const params = {
      region: character.region,
      realm: character.realm,
      name: character.name,
    };

    return this.http
      .get<CharacterDetails>(`${this.baseUrl}character/profile`, { params })
      .pipe(
        map((response) => {
          this.storageService.setItem(this.getStorageKey(character), response);
          return response;
        })
      );
  }

  public getCharacterMythicPlusScores(
    character: Character
  ): Observable<MythicPlusScores[]> {
    const storageKey = `${this.getStorageKey(character)}:mythicPlusScores`;
    const cachedData =
      this.storageService.getItem<MythicPlusScores[]>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchAndStoreMythicPlusScores(character);
  }

  private fetchAndStoreMythicPlusScores(
    character: Character
  ): Observable<MythicPlusScores[]> {
    const params = {
      region: character.region,
      realm: character.realm,
      name: character.name,
    };

    return this.http
      .get<MythicPlusScores[]>(`${this.baseUrl}character/mythic-plus-scores`, {
        params,
      })
      .pipe(
        map((response) => {
          this.storageService.setItem(
            `${this.getStorageKey(character)}:mythicPlusScores`,
            response
          );
          return response;
        })
      );
  }

  public getCharacterMythicPlusBestRuns(
    character: Character
  ): Observable<MythicPlusBestRuns[]> {
    const storageKey = `${this.getStorageKey(character)}:mythicPlusBestRuns`;
    const cachedData =
      this.storageService.getItem<MythicPlusBestRuns[]>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchAndStoreMythicPlusBestRuns(character);
  }

  private fetchAndStoreMythicPlusBestRuns(
    character: Character
  ): Observable<MythicPlusBestRuns[]> {
    const params = {
      region: character.region,
      realm: character.realm,
      name: character.name,
    };

    return this.http
      .get<MythicPlusBestRuns[]>(
        `${this.baseUrl}character/mythic-plus-best-runs`,
        {
          params,
        }
      )
      .pipe(
        map((response) => {
          this.storageService.setItem(
            `${this.getStorageKey(character)}:mythicPlusBestRuns`,
            response
          );
          return response;
        })
      );
  }
}
