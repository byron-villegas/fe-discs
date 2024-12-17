import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @ViewChild('backgroundSound')
  public backgroundSound:  ElementRef | undefined;
  private audio: HTMLMediaElement | undefined

  constructor() {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.audio = this.backgroundSound!.nativeElement;
    this.audio!.volume = 0.1; // 10%
  }
}