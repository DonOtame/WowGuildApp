import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '@shared/services/translation.service';

@Component({
  selector: 'languaje-selector',
  imports: [],
  templateUrl: './languaje-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguajeSelectorComponent {

  private translationService = inject(TranslationService);

  public currentLang: string;

  constructor() {
    this.currentLang = this.getSavedLanguage();
  }

  changeLanguage(event: Event): void {
    const lang = (event.target as HTMLSelectElement).value;

    this.translationService.setLanguage(lang);
    document.cookie = `language=${lang}; path=/;`;
    window.location.reload();
  }

  getSavedLanguage(): string {
    const match = document.cookie.match(/(?:^|; )language=([^;]*)/);
    return match ? match[1] : this.translationService.getLanguage();
  }


}
