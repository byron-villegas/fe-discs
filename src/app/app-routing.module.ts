import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './modules/home/components/about/about.component';
import { ContactComponent } from './modules/home/components/contact/contact.component';
import { PageNotFoundComponent } from './modules/home/components/page-not-found/page-not-found.component';
import { DiscViewComponent } from './modules/disc/components/disc-view/disc-view.component';
import { DiscCategoryComponent } from './modules/disc/components/disc-category/disc-category.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: AboutComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'disc-category/:categoryName',
    component: DiscCategoryComponent,
  },
  {
    path: 'disc-category/:categoryName/page/:pageNumber',
    component: DiscCategoryComponent,
  },
  {
    path: 'disc-category/:categoryName/:subCategoryName',
    component: DiscCategoryComponent,
  },
  {
    path: 'disc-category/:categoryName/:subCategoryName/page/:pageNumber',
    component: DiscCategoryComponent,
  },
  {
    path: 'disc/:sku',
    component: DiscViewComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}