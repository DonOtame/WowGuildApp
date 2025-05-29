import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { MembersResponse } from '../interfaces';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  public getMembersResponse(): Observable<MembersResponse[]> {
    const storageKey = `members:${environment.params.name}`;
    const cachedMembers =
      this.storageService.getItem<MembersResponse[]>(storageKey);

    if (cachedMembers) {
      return of(cachedMembers);
    } else {
      return this.fetchMembersResponse();
    }
  }

  private fetchMembersResponse(): Observable<MembersResponse[]> {
    const url = `${this.baseUrl}guild/members`;
    const params = {
      ...environment.params,
      fields: 'members',
    };

    return this.http.get<MembersResponse[]>(url, { params });
  }
}
