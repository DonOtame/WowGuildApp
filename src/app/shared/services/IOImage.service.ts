import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class IOImageService {
  public onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = environment.defaultImage;
  }
}
