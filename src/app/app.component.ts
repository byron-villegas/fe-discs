import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, RouterEvent } from '@angular/router';
import { ReplaceAllPipe } from './shared/pipe/replace-all.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string = '';

  constructor(private router: Router, private replaceAll: ReplaceAllPipe, private titleService: Title) {

    this.router.events.subscribe((event) => {
      if (event instanceof RouterEvent) {
        this.url = event.url;

        let urlSplit = this.url.split('/');
        let lastPath = urlSplit[urlSplit.length - 1];

        switch (lastPath) {
          case 'about-us':
            this.titleService.setTitle('Quienes Somos – Discs');
            break;
          case 'contact-us':
            this.titleService.setTitle('Contáctanos – Discs');
            break;
          default:
            if (!this.url.includes('disc/')) {
              if (lastPath == '') {
                this.titleService.setTitle('Discs');
              } else {
                if (urlSplit.includes('vinilos') || urlSplit.includes('cds') || urlSplit.includes('cassettes')) {

                  if (urlSplit.includes('page')) {
                    if (['vinilos', 'cds', 'cassettes'].includes(urlSplit[urlSplit.indexOf('page') - 1])) {
                      this.titleService.setTitle(this.firstLetterUpperCase(urlSplit[urlSplit.indexOf('page') - 1]) + ' – Pagina ' + urlSplit[urlSplit.indexOf('page') + 1] + ' – Discs');
                    } else {
                      this.titleService.setTitle(this.firstLetterUpperCase(urlSplit[urlSplit.indexOf('page') - 2]) + ' – ' + this.firstLetterUpperCase(urlSplit[urlSplit.indexOf('page') - 1]) + ' – Pagina ' + urlSplit[urlSplit.indexOf('page') + 1] + ' – Discs');
                    }
                  } else {
                    if (['vinilos', 'cds', 'cassettes'].includes(lastPath)) {
                      this.titleService.setTitle(this.firstLetterUpperCase(lastPath) + ' – Discs');

                    } else {
                      this.titleService.setTitle(this.firstLetterUpperCase(lastPath) + ' – ' + this.firstLetterUpperCase(urlSplit[urlSplit.length - 2]) + ' – Discs');
                    }
                  }
                } else {
                  this.titleService.setTitle(this.firstLetterUpperCase(lastPath) + ' – Discs');
                }
              }
            }
        }
      }

      // SI CAMBIA DE PAGINA EL NAVBAR DEBE CERRARSE AUTOMATICAMENTE
      if(document.getElementById('navbarSupportedContent')!.classList.contains('show')) {
        document.getElementById('navbar-toggler')!.click();
      }
    });
  }

  ngOnInit() {
    localStorage.removeItem('order');
  }

  private firstLetterUpperCase(word: string) {
    if (!word.includes('-')) {
      return this.replaceAll.transform(word, '-+', ' ')[0].toUpperCase() + this.replaceAll.transform(word, '-+', ' ').substring(1);
    }
    return this.replaceAll
      .transform(word, '-+', ' ')
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substring(1))
      .join(' ');
  }
}