import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceAll'
})
export class ReplaceAllPipe implements PipeTransform {

  transform(value: string, replaceExp: string, newValue: string): string {
    if(!value) {
      return '';
    }
    return value.replace(RegExp(replaceExp, 'g'), newValue);
  }
}