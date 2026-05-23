import { Component } from '@angular/core';
import { DiscService } from './core/services/disc.service';
import { Title } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './modules/home/components/navbar/navbar.component';
import { NgIf } from '@angular/common';
import { CategoriesComponent } from './modules/home/components/categories/categories.component';
import { FavoriteDiscsComponent } from './modules/home/components/favorite-discs/favorite-discs.component';
import { FooterComponent } from './modules/home/components/footer/footer.component';
import { SearchDiscsComponent } from './modules/home/components/search-discs/search-discs.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavbarComponent, NgIf, CategoriesComponent, FavoriteDiscsComponent, RouterOutlet, FooterComponent, SearchDiscsComponent]
})
export class AppComponent {
  constructor(
    protected router: Router,
    private titleService: Title,
    private discService: DiscService
  ) {
    let preloaded = false;
    this.router.events.subscribe((event) => {
      if (this.router.url == '/' && !preloaded) {
        this.titleService.setTitle('Discs');
        // Precarga la primera página de discos para vinyls y cds solo una vez
        this.discService.findDiscsPage({
          page: 1,
          size: 15,
          type: 'vinyls'
        }).subscribe();
        this.discService.findDiscsPage({
          page: 1,
          size: 15,
          type: 'cds'
        }).subscribe();
        preloaded = true;
      }
      // SI CAMBIA DE PAGINA EL NAVBAR DEBE CERRARSE AUTOMATICAMENTE
      if (document.getElementById('navbarSupportedContent')?.classList.contains('show')) {
        document.getElementById('navbar-toggler')?.click();
      }
    });
  }
}