import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Disc } from 'src/app/core/models/disc';
import { DiscService } from 'src/app/core/services/disc.service';
import { ReplaceAllPipe } from 'src/app/shared/pipe/replace-all.pipe';

@Component({
  selector: 'app-disc-view',
  templateUrl: './disc-view.component.html',
  styleUrls: ['./disc-view.component.css']
})
export class DiscViewComponent implements OnInit {
  sku: string | undefined;
  disc: Disc | undefined;
  categoryName: string | undefined;
  subCategoryName: string | undefined;
  baseUrl: string;
  pageUrl: string;
  imageSelected: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private locationService: Location, private discService: DiscService, public replaceAll: ReplaceAllPipe, private titleService: Title) {
    this.baseUrl = location.toString().substring(0, location.toString().indexOf('#'));
    this.pageUrl = location.toString();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('sku')) {
        this.sku = params.get('sku')!;
      }

      this.disc = this.discService.findDiscBySku(this.sku!);
      this.titleService.setTitle(this.disc!.author + ' – ' + this.disc!.name + ' – Discs')
      this.subCategoryName = this.disc.categories[0].toLowerCase();
      this.disc.categories.forEach(category => {
        if (['vinilos', 'cds', 'cassettes'].includes(category.toLocaleLowerCase())) {
          this.categoryName = category.toLowerCase();
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
}