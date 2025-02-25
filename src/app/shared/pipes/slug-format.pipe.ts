import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugFormat',
})
export class SlugFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }
    return value
      .split('-')
      .map(word => word.length > 2 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
      .join(' ');
  }

}
