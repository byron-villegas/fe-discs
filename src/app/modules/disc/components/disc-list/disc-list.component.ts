import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { Disc } from '@models/disc';
import { RouterLink } from '@angular/router';
import { ImageRoutePipe } from '@pipes/image-route.pipe';

@Component({
    selector: 'app-disc-list',
    templateUrl: './disc-list.component.html',
    styleUrls: ['./disc-list.component.css'],
    imports: [RouterLink, ImageRoutePipe, NgIf, NgForOf]
})
export class DiscListComponent implements OnInit {
  @Input()
  discs: Disc[] | undefined;

  constructor() {
    
  }

  ngOnInit() {
    
  }
}