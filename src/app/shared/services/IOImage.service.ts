import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class IOImageService {

  private currentRaid = environment.currentRaid;

  public getRaidImage(raidKey?: string): string {
    return raidKey
      ? `https://cdn.raiderio.net/images/${raidKey}/headers/_zone.jpg`
      : environment.defaultImage;
  }

  public onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = environment.defaultImage;
  }

  public getEncounterImage(encounterSlug?: string): string {
    return encounterSlug
      ? `https://cdn.raiderio.net/cdn-cgi/image/quality=75,width=205/images/${this.currentRaid}/portraits/${encounterSlug}.png`
      : environment.defaultImage;
  }
}
