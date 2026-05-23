import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    imports: [RouterLink]
})
export class PageNotFoundComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Página No Encontrada – Discs');

  }

  ngOnInit() {
    
  }
}