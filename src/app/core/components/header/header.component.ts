import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseGuild } from '@core/interfaces';
import { GuildSummaryService } from '@core/providers/guild-summary.service';
import { environment } from '@env/environment';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  public guildImage = environment.guildImage;
  private guildSummaryService = inject(GuildSummaryService);
  private title = inject(Title);

  public guild = signal<BaseGuild | null>(null);


  constructor() {
    this.guildSummaryService.getSummaryGuildResponse()
      .subscribe((guild) => {
        this.guild.set(guild);
        this.title.setTitle(this.guild()!.name);
      });


  }

}
