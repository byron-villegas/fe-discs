import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxBarcodeModule } from '@greatcloak/ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { RedZoomModule } from 'ngx-red-zoom';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscCategoryComponent } from './components/disc-category/disc-category.component';
import { DiscListComponent } from './components/disc-list/disc-list.component';
import { DiscViewComponent } from './components/disc-view/disc-view.component';

@NgModule({
  imports: [
    CommonModule,
    QRCodeModule,
    NgxBarcodeModule,
    RedZoomModule,
    SharedModule
  ],
  declarations: [DiscCategoryComponent, DiscListComponent, DiscViewComponent],
  exports: [DiscCategoryComponent, DiscListComponent, DiscViewComponent]
})
export class DiscModule { }