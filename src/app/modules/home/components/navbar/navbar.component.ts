import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-home-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    imports: [RouterLink, NgClass]
})
export class NavbarComponent implements OnInit {

  constructor(protected router: Router) {

  }


  ngOnInit() {
    // Cierra el navbar automáticamente al cambiar de ruta
    this.router.events.subscribe(() => {
      const navbar = document.getElementById('navbarSupportedContent');
      const toggler = document.getElementById('navbar-toggler');
      if (navbar?.classList.contains('show')) {
        toggler?.click();
      }
    });
  }

  get route(): Router {
    return this.router;
  }
}