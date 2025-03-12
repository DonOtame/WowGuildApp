import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable, of } from 'rxjs';
import { Member } from '../interfaces';
import { StorageService } from '../../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {


  private baseUrl = environment.baseUrl;

  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  public getMembersResponse(): Observable<{ members: Member[] }> {
    const storageKey = `members:${environment.params.name}`;

    const cachedMembers = this.storageService.getItem<Member[]>(storageKey);
    if (cachedMembers) {
      return of({ members: cachedMembers });
    }

    const url = `${this.baseUrl}guilds/profile`;
    const params = {
      ...environment.params,
      fields: 'members'
    };

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        const members: Member[] = response.members
          .filter((m: any) => [0, 1, 2, 3].includes(m.rank))
          .map((m: any) => ({
            rank: m.rank,
            character: {
              name: m.character.name,
              region: m.character.region,
              realm: m.character.realm
            }
          }));

        this.storageService.setItem(storageKey, members);

        return { members };
      })
    );
  }




}
