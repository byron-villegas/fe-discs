import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FavoriteDiscsComponent } from './components/favorite-discs/favorite-discs.component';
import { SearchDiscsComponent } from './components/search-discs/search-discs.component';
import { DiscModule } from '../disc/disc.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    DiscModule
  ],
  declarations: [NavbarComponent, CategoriesComponent, FavoriteDiscsComponent, SearchDiscsComponent, FooterComponent, AboutComponent, ContactComponent, PageNotFoundComponent],
  exports: [NavbarComponent, CategoriesComponent, FavoriteDiscsComponent, SearchDiscsComponent, FooterComponent, AboutComponent, ContactComponent, PageNotFoundComponent]
})
export class HomeModule { }
