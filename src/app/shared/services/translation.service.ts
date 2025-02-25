import { Injectable } from '@angular/core';
import { baseTranslations, nerubarPalaceTranslations, classTranslations, raceTranslations, affixesTranslations, dungeonsTranslations } from '@translations';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang: string;

  private translations = {
    ...baseTranslations,
    ...nerubarPalaceTranslations,
    ...classTranslations,
    ...raceTranslations,
    ...affixesTranslations,
    ...dungeonsTranslations,
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
    console.log('Setting language to:', lang);
    this.currentLang = lang;
  }

  getLanguage(): string {
    return this.currentLang;
  }

  getTranslation(key: string): string {
    return this.translations[key]?.[this.currentLang] || key;
  }
}
