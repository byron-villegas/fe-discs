import { Component, OnInit } from '@angular/core';
import { Disc } from '@models/disc';
import { DiscService } from '@services/disc.service';
import { DiscListComponent } from '../../../disc/components/disc-list/disc-list.component';

@Component({
    selector: 'app-home-favorite-discs',
    templateUrl: './favorite-discs.component.html',
    styleUrls: ['./favorite-discs.component.css'],
    imports: [DiscListComponent]
})
export class FavoriteDiscsComponent implements OnInit {
  favoriteDiscs: Disc[] = [];

  constructor(private discService: DiscService) {
    this.favoriteDiscs = this.discService.getFavoriteDiscs();

    if(this.favoriteDiscs.length == 0) {
      this.discService.findFavoriteDiscs().subscribe(resp => {
        this.favoriteDiscs = resp;
        this.discService.setFavoriteDiscs(resp);
      });
    }
  }

  ngOnInit() {

  }
}