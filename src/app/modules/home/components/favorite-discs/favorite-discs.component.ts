import { Component, OnInit } from '@angular/core';
import { Disc } from 'src/app/core/models/disc';
import { DiscService } from 'src/app/core/services/disc.service';

@Component({
  selector: 'app-home-favorite-discs',
  templateUrl: './favorite-discs.component.html',
  styleUrls: ['./favorite-discs.component.css']
})
export class FavoriteDiscsComponent implements OnInit {
  favoriteDiscs: Disc[] = [];

  constructor(private discService: DiscService) {
      this.discService.findFavoriteDiscs().subscribe(resp => {
        this.favoriteDiscs = resp;
      });
  }

  ngOnInit() {

  }
}