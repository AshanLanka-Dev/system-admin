import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'uppercaseToTitleCase',
  standalone: true
})
export class UppercaseToTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Convert uppercase string to first letter capital only
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
