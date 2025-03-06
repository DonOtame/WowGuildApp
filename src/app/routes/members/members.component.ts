import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { Member } from './interfaces';
import { MembersService } from './services/members.service';

@Component({
  imports: [CommonModule, CharactersListComponent, TranslatePipe],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MembersComponent {

  private membersService = inject(MembersService);

  public members = signal<Member[]>([]);

  public guildMaster = computed(() => {
    return this.members().filter(member => member.rank === 0);
  });

  public officers = computed(() => {
    return this.members().filter(member => member.rank === 1);
  });

  public raiders = computed(() => {
    return this.members().filter(member => member.rank === 2 || member.rank === 3);
  });


  constructor() {
    this.membersService.getMembersResponse()
      .subscribe((guild) => {
        this.members.set(guild.members);
      });
  }

}
