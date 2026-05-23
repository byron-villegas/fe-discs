import { Pipe, PipeTransform } from '@angular/core';
import { formatFirstLetterUpperCase } from '@functions/text';

@Pipe({ name: 'firstLetterUppercase' })
export class FirstLetterUppercasePipe implements PipeTransform {
  
  transform(value: string): string {
    return formatFirstLetterUpperCase(value);
  }
}