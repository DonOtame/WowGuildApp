import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseGuild } from '@core/interfaces';
import { environment } from '@env/environment';
import { StorageService } from '@shared/services/storage.service';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuildSummaryService {
  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  getSummaryGuildResponse(): Observable<BaseGuild> {
    const storageKey = `guild:${environment.params.name}`;

    const cachedData = this.storageService.getItem<BaseGuild>(storageKey);

    if (cachedData) {
      return of(cachedData);
    }

    const url = `${this.baseUrl}guild/profile`;
    const params = environment.params;

    return this.http.get<BaseGuild>(url, { params }).pipe(
      map((response) => {
        this.storageService.setItem(storageKey, response);
        return response;
      })
    );
  }
}
