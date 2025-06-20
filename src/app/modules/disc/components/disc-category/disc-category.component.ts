import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { getTitleCategoryNameByName } from 'src/app/core/functions/text';
import { Disc } from 'src/app/core/models/disc';
import { SubCategory } from 'src/app/core/models/subcategory';
import { DiscCategoryService } from 'src/app/core/services/disc-category.service';
import { DiscService } from 'src/app/core/services/disc.service';
import { ReplaceAllPipe } from 'src/app/shared/pipe/replace-all.pipe';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-disc-category',
  templateUrl: './disc-category.component.html',
  styleUrls: ['./disc-category.component.css']
})
export class DiscCategoryComponent implements OnInit {
  @ViewChild('orderSelect')
  orderSelect: ElementRef<HTMLInputElement> | undefined;
  categoriasCheck: boolean[] = [false, false, false];
  subCategorias: SubCategory = { vinyls: [], cds: [], cassettes: [] };
  categoryName: string = '';
  subCategoryName: string = '';
  order: string = 'reset';
  discs: Disc[] = [];
  orderedDiscs: Disc[] = [];
  position = 0;
  division: Disc[][] = [];

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private discService: DiscService, public replaceAll: ReplaceAllPipe, private discCategoryService: DiscCategoryService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName')!;

      let title = `${this.categoryName}`;

      title = getTitleCategoryNameByName(this.categoryName);

      if (!params.get('subCategoryName') && !params.get('pageNumber')) {
        title = `${title} – Discs`;
      }

      if (params.get('subCategoryName')) {
        this.subCategoryName = params.get('subCategoryName')!;
        title = `${title} – ${this.subCategoryName} – Discs`;
      }

      if (params.get('pageNumber')) {
        title = `${title} – Página ${params.get('pageNumber')} – Discs`;
      }

      this.titleService.setTitle(this.firstLetterUpperCase(title));

      if (!environment.discsTypes.includes(this.categoryName)) {
        this.router.navigate(['page-not-found']);
        return;
      }

      this.discs = this.getDiscs();

      this.orderedDiscs = this.getDefaultDivision();

      this.subCategorias = this.discService.findDiscsSubCategories();

      this.order = this.discCategoryService.getOrder();

      if (!params.get('pageNumber')) {
        this.order = 'reset';
      }

      if (params.get('pageNumber') && !parseInt(params.get('pageNumber')!)) {
        this.redirectToNotFoundPage();
      }

      if (params.get('pageNumber')) {
        this.position = parseInt(params.get('pageNumber')!);

        if (this.position > this.division.length || this.position < 0) {
          this.redirectToNotFoundPage();
        }

        this.position = this.position - 1;
      }

      this.changeDiscPage(this.position);
      this.onOrder(this.order);

      if (this.discs.length == 0) {
        this.redirectToNotFoundPage();
      }
    });
  }

  getDiscs(): Disc[] {
    if (this.subCategoryName == '') {
      return this.discService.findDiscsByType(this.categoryName);
    } else {
      return this.discService.findDiscsByCategoryAndSubCategory(this.categoryName!, this.replaceAll.transform(this.subCategoryName!, '-+', ' '));
    }
  }

  getDefaultDivision(): Disc[] {
    this.division = [];
    let discsSplit: Disc[] = [];

    let j = 1;

    if (this.discs.length <= 14) {
      this.division.push(this.discs);
    } else {
      for (let i = 0; i < this.discs.length; i++) {

        if (j == 15) {
          discsSplit.push(this.discs[i]);
          this.division.push(discsSplit);
          discsSplit = [];
          j = 1;
        } else {
          discsSplit.push(this.discs[i]);
          j++;
        }

        if ((i + 1) == this.discs.length && discsSplit.length > 0) {
          this.division.push(discsSplit);
        }
      }
    }

    return this.division[0];
  }

  redirectToNotFoundPage(): void {
    this.router.navigate(['page-not-found']);
    return;
  }

  getDivision(): Disc[] {
    this.division = [];
    let discsSplit: Disc[] = [];

    let j = 1;

    if (this.discs.length <= 14) {
      this.division.push(this.discs);
    } else {
      for (let i = 0; i < this.discs.length; i++) {

        if (j == 15) {
          discsSplit.push(this.discs[i]);
          this.division.push(discsSplit);
          discsSplit = [];
          j = 1;
        } else {
          discsSplit.push(this.discs[i]);
          j++;
        }

        if ((i + 1) == this.discs.length && discsSplit.length > 0) {
          this.division.push(discsSplit);
        }
      }
    }

    return this.division[this.position];
  }

  activate(index: number): void {
    this.categoriasCheck[index] = true;
  }

  desactivate(index: number): void {
    this.categoriasCheck[index] = false;
  }

  onOrder(value: string) {
    this.order = value;

    this.discCategoryService.setOrder(this.order);

    this.orderedDiscs = this.discs;

    switch (value) {
      case 'name+':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => x.name.localeCompare(y.name));
        break;
      case 'name-':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => y.name.localeCompare(x.name));
        break;
      case 'author+':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => x.author.localeCompare(y.author));
        break;
      case 'author-':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => y.author.localeCompare(x.author));
        break;
      case 'year+':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => x.yearCreated - y.yearCreated);
        break;
      case 'year-':
        this.orderedDiscs = this.orderedDiscs.sort((x, y) => y.yearCreated - x.yearCreated);
        break;
      default:
        this.discs = this.getDiscs();
        this.division = [];
        this.orderedDiscs = this.getDefaultDivision();
        this.position = 0;
        this.order = 'reset';
        break;
    }

    this.orderedDiscs = this.getDivision();
    this.orderedDiscs = this.division[this.position];
  }

  changeDiscPage(position: number): void {
    this.position = position;
    this.orderedDiscs = this.division[position];
  }

  private firstLetterUpperCase(word: string) {
    if (!word.includes('–')) {
      return this.replaceAll.transform(word, '-+', ' ')[0].toUpperCase() + this.replaceAll.transform(word, '-+', ' ').substring(1);
    }

    return this.replaceAll
      .transform(word, '-+', ' ')
      .split(' ')
      .map((w) => w[0].toUpperCase() + w.substring(1))
      .join(' ');
  }
}