import { Pipe, PipeTransform } from '@angular/core';
import { Disc } from 'src/app/core/models/disc';

@Pipe({
  name: 'imageRoute'
})
export class ImageRoutePipe implements PipeTransform {

  transform(disc: Disc, image: string): any {
    return 'assets/images/discs/' + disc.type.toLowerCase() + 's' + '/' + disc.sku + '/' + image;
  }
}