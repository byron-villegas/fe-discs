import { Component, Input, OnInit } from '@angular/core';
import { Disc } from 'src/app/core/models/disc';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageRoutePipe } from '../../../../shared/pipes/image-route.pipe';

@Component({
    selector: 'app-disc-list',
    templateUrl: './disc-list.component.html',
    styleUrls: ['./disc-list.component.css'],
    imports: [NgFor, RouterLink, NgIf, ImageRoutePipe]
})
export class DiscListComponent implements OnInit {
  @Input()
  discs: Disc[] | undefined;

  constructor() {
    
  }

  ngOnInit() {
    
  }
}