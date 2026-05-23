import { Location, UpperCasePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import JsBarcode from 'jsbarcode';
import { Disc } from '@models/disc';
import { DiscService } from '@services/disc.service';
import { ReplaceAllPipe } from '@pipes/replace-all.pipe';
import { RedZoomDirective } from 'ngx-red-zoom';
import { QRCodeComponent } from 'angularx-qrcode';
import { ImageRoutePipe } from '@pipes/image-route.pipe';

@Component({
    selector: 'app-disc-view',
    templateUrl: './disc-view.component.html',
    styleUrls: ['./disc-view.component.css'],
  imports: [RouterLink, NgIf, NgForOf, NgClass, RedZoomDirective, QRCodeComponent, UpperCasePipe, ReplaceAllPipe, ImageRoutePipe],
  providers: [ReplaceAllPipe]
})
export class DiscViewComponent implements OnInit {
  @ViewChild('barcodeElement') barcodeElement?: ElementRef<SVGSVGElement>;
  sku: string | undefined;
  disc: Disc | undefined;
  subCategoryName: string | undefined;
  baseUrl: string;
  pageUrl: string;
  imageSelected: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: Location, private discService: DiscService, public replaceAll: ReplaceAllPipe, private titleService: Title) {
    this.baseUrl = location.toString().split('disc/')[0];
    this.pageUrl = location.toString();
  }

  ngAfterViewInit(): void {
    this.renderBarcode();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('sku')) {
        this.sku = params.get('sku')!;
      }

      this.disc = {
        sku: this.sku!,
        name: '',
        description: '',
        author: '',
        publisher: '',
        yearCreated: 0,
        country: '',
        images: [],
        categories: [],
        trackList: [],
        favorite: false,
        type: ''
      };

      let discOfList = this.discService.findDiscBySkuFromList(this.sku!);

      if(discOfList) {
        this.disc = discOfList;
        this.titleService.setTitle(this.disc.author + ' – ' + this.disc.name + ' – Discs');
        this.subCategoryName = this.disc.categories[0].toLowerCase();
        this.renderBarcode();
        return;
      }

      this.discService.findDiscBySku(this.sku!).subscribe({
        next: (resp) => {
          this.disc = resp;

          this.titleService.setTitle(this.disc!.author + ' – ' + this.disc!.name + ' – Discs');
          this.subCategoryName = this.disc.categories[0].toLowerCase();
          this.renderBarcode();
        },
        error: () => {
          this.router.navigate(['/page-not-found']);
        }
      });
    });
  }

  home(): void {
    this.router.navigate(['/']);
  }

  back(): void {
    this.locationService.back();
  }

  changeImageSelected(position: number): void {
    this.imageSelected = position;
  }

  private renderBarcode(): void {
    if (!this.barcodeElement?.nativeElement || !this.disc?.sku) {
      return;
    }

    JsBarcode(this.barcodeElement.nativeElement, this.disc.sku, {
      displayValue: true,
      font: 'monospace',
      height: 60
    });
  }
}