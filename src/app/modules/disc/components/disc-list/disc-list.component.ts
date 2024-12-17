import { Component, Input, OnInit } from '@angular/core';
import { Disc } from 'src/app/core/models/disc';

@Component({
  selector: 'app-disc-list',
  templateUrl: './disc-list.component.html',
  styleUrls: ['./disc-list.component.css']
})
export class DiscListComponent implements OnInit {
  @Input()
  discs: Disc[] | undefined;

  constructor() {
    
  }

  ngOnInit() {
    
  }
}