import { computed, inject, Injectable, signal } from '@angular/core';
import { MembersResponse } from '../interfaces';
import { MembersService } from './members.service';

@Injectable({
  providedIn: 'root',
})
export class MembersStateService {
  private membersService = inject(MembersService);

  public members = signal<MembersResponse[]>([]);

  public guildMaster = computed(() => {
    return this.members().filter((member) => member.rank === 0);
  });

  public officers = computed(() => {
    return this.members().filter((member) => member.rank === 1);
  });

  public raiders = computed(() => {
    return this.members().filter(
      (member) => member.rank === 2 || member.rank === 3
    );
  });

  constructor() {
    this.membersService.getMembersResponse().subscribe((members) => {
      this.members.set(members);
    });
  }
}
