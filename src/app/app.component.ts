import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected router: Router, private titleService: Title) {
    this.router.events.subscribe((event) => {
      
      if(this.router.url == '/') {
        this.titleService.setTitle('Discs');
      }

      // SI CAMBIA DE PAGINA EL NAVBAR DEBE CERRARSE AUTOMATICAMENTE
      if(document.getElementById('navbarSupportedContent')!.classList.contains('show')) {
        document.getElementById('navbar-toggler')!.click();
      }
    });
  }
}