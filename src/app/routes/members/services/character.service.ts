import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Character, CharacterSummary } from '../interfaces';
import { StorageService } from '../../../shared/services/storage.service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private baseUrl = `${environment.baseUrl}characters/profile?`;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private getStorageKey(character: CharacterSummary): string {
    return `character:${character.region}&${character.realm}&${character.name}`;
  }

  private fetchAndStoreCharacterData(character: CharacterSummary): Observable<Character> {
    const params = {
      region: character.region,
      realm: character.realm,
      name: character.name,
      fields: 'mythic_plus_scores_by_season:current,mythic_plus_best_runs'
    };

    return this.http.get<Character>(this.baseUrl, { params }).pipe(
      map(response => {
        this.storageService.setItem(this.getStorageKey(character), response);
        return response;
      })
    );
  }

  public getCharacterData(character: CharacterSummary): Observable<Character> {
    const storageKey = this.getStorageKey(character);
    const cachedData = this.storageService.getItem<Character>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.fetchAndStoreCharacterData(character);
  }
}
