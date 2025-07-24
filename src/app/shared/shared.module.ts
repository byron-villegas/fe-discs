import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaceAllPipe } from './pipes/replace-all.pipe';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { ImageRoutePipe } from './pipes/image-route.pipe';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  declarations: [ReplaceAllPipe, FirstLetterUppercasePipe, ImageRoutePipe],
  exports: [ReplaceAllPipe, FirstLetterUppercasePipe, ImageRoutePipe],
  providers: [ReplaceAllPipe, FirstLetterUppercasePipe, ImageRoutePipe]
})
export class SharedModule { }