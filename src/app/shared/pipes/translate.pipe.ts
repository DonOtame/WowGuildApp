import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '@shared/services/translation.service';
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  private translationService = inject(TranslationService);

  transform(value: string | number | null | undefined, lang: string = ''): string {
    if (value == null || value == undefined) return '';

    if (typeof value !== 'string' || typeof value !== 'number') {
      value = value.toString();
    }

    if (!lang) {
      lang = this.translationService.getLanguage();
    }

    return this.translationService.getTranslation(value) || value;
  }
}
