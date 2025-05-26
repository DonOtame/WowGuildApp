import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { CharactersListComponent } from './components/characters-list/characters-list.component';
import { MembersStateService } from './services/members-state.service';

@Component({
  imports: [CommonModule, CharactersListComponent, TranslatePipe],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MembersComponent {
  private membersStateService = inject(MembersStateService);

  public members = this.membersStateService.members;
  public guildMaster = this.membersStateService.guildMaster;
  public officers = this.membersStateService.officers;
  public raiders = this.membersStateService.raiders;
}
