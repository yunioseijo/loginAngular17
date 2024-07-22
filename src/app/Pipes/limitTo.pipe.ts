import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo',
  standalone: true,
})
export class LimitToPipe implements PipeTransform {

  transform(value: string | undefined | null, limit: number): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }

}
