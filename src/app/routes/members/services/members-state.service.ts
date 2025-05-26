import { computed, inject, Injectable, signal } from '@angular/core';
import { Member } from '../interfaces';
import { MembersService } from './members.service';

@Injectable({
  providedIn: 'root',
})
export class MembersStateService {
  private membersService = inject(MembersService);

  public members = signal<Member[]>([]);

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
    this.membersService.getMembersResponse().subscribe((guild) => {
      this.members.set(guild.members);
    });
  }
}
