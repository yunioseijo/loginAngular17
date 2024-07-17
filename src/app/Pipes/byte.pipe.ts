import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'Byte',
  standalone: true,
})
export class BytePipe implements PipeTransform {

  transform(bytes: number, precision: number = 1): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
      return '-';
    }
    if (bytes === 0) {
      return '0 bytes';
    }

    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
    if (unitIndex === 0) {
      precision = 0;
    }

    return (bytes / Math.pow(1024, unitIndex)).toFixed(precision) + ' ' + units[unitIndex];
  }


}
