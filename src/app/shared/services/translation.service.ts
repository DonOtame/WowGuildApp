import { Injectable } from '@angular/core';
import {
  baseTranslations,
  nerubarPalaceTranslations,
  classTranslations,
  raceTranslations,
  affixesTranslations,
  dungeonsTranslations,
  liberationOfUndermineTranslations,
} from '@translations';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang: string;

  private translations = {
    ...baseTranslations,
    ...classTranslations,
    ...raceTranslations,
    ...affixesTranslations,
    ...dungeonsTranslations,
    ...nerubarPalaceTranslations,
    ...liberationOfUndermineTranslations,
  };

  constructor() {
    const cookieLang = this.getCookie('language');
    this.currentLang = cookieLang || 'en';
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  setLanguage(lang: string): void {
    this.currentLang = lang;
  }

  getLanguage(): string {
    return this.currentLang;
  }

  getTranslation(key: string): string {
    return this.translations[key]?.[this.currentLang] || key;
  }
}
