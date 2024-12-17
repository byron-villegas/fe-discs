import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBarcodeModule } from '@greatcloak/ngx-barcode';
import { QRCodeModule } from 'angularx-qrcode';
import { RedZoomModule } from 'ngx-red-zoom';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DiscModule } from './modules/disc/disc.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QRCodeModule,
    NgxBarcodeModule,
    RedZoomModule,
    SharedModule,
    HomeModule,
    DiscModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}