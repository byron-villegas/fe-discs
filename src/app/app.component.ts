import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(protected router: Router) {
    this.router.events.subscribe((event) => {
      
      // SI CAMBIA DE PAGINA EL NAVBAR DEBE CERRARSE AUTOMATICAMENTE
      if(document.getElementById('navbarSupportedContent')!.classList.contains('show')) {
        document.getElementById('navbar-toggler')!.click();
      }
    });
  }

  ngOnInit() {
    localStorage.removeItem('order');
  }
}