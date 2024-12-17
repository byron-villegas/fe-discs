import { Pipe, PipeTransform } from '@angular/core';
import { formatFirstLetterUpperCase } from 'src/app/core/functions/text';

@Pipe({
  name: 'firstLetterUppercase'
})
export class FirstLetterUppercasePipe implements PipeTransform {
  
  transform(value: string): string {
    return formatFirstLetterUpperCase(value);
  }
}