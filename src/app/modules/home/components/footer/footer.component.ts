import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-home-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [RouterLink, NgClass]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  constructor(protected router: Router) {

  }

  ngOnInit() {

  }

  get route(): Router {
    return this.router;
  }
}