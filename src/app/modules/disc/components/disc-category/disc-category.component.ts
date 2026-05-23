import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getTitleCategoryNameByName } from '@functions/text';
import { Disc } from '@models/disc';
import { SubCategory } from '@models/subcategory';
import { DiscCategoryService } from '@services/disc-category.service';
import { DiscService, PagedResponse } from '@services/disc.service';
import { ReplaceAllPipe } from '@pipes/replace-all.pipe';
import { environment } from '@environments/environment';
import { UpperCasePipe, LowerCasePipe } from '@angular/common';
import { DiscListComponent } from '../disc-list/disc-list.component';

@Component({
    selector: 'app-disc-category',
    templateUrl: './disc-category.component.html',
    styleUrls: ['./disc-category.component.css'],
  imports: [RouterLink, NgIf, NgForOf, NgClass, DiscListComponent, UpperCasePipe, LowerCasePipe, ReplaceAllPipe],
  providers: [ReplaceAllPipe]
})
export class DiscCategoryComponent implements OnInit {
  categoriasCheck: boolean[] = [false, false, false];
  subCategorias: SubCategory = { vinyls: [], cds: [], cassettes: [] };
  categoryName: string = '';
  subCategoryName: string = '';
  order: string = 'reset';
  discs: Disc[] = [];
  orderedDiscs: Disc[] = [];
  currentPage = 1;
  pageSize = 15;
  totalItems = 0;
  totalPages = 0;

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private discService: DiscService, public replaceAll: ReplaceAllPipe, private discCategoryService: DiscCategoryService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName')!;
      this.subCategoryName = params.get('subCategoryName') ?? '';

      const pageNumber = this.getPageNumber(params.get('pageNumber'));

      if (pageNumber === null) {
        this.redirectToNotFoundPage();
        return;
      }

      let title = `${this.categoryName}`;

      title = getTitleCategoryNameByName(this.categoryName);

      if (!this.subCategoryName && !params.get('pageNumber')) {
        title = `${title} – Discs`;
      }

      if (this.subCategoryName) {
        title = `${title} – ${this.subCategoryName} – Discs`;
      }

      if (pageNumber > 1) {
        title = `${title} – Página ${pageNumber} – Discs`;
      }

      this.titleService.setTitle(this.firstLetterUpperCase(title));

      if (!environment.discsTypes.includes(this.categoryName)) {
        this.router.navigate(['page-not-found']);
        return;
      }

      this.subCategorias = this.discService.findDiscsSubCategories();

      this.order = this.discCategoryService.getOrder();

      this.loadDiscsPage(pageNumber);
    });
  }

  redirectToNotFoundPage(): void {
    this.router.navigate(['page-not-found']);
    return;
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
    // Mantener la página actual al cambiar el orden
    this.loadDiscsPage(this.currentPage);
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

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPageRoute(page: number): string {
    const categoryPath = `/disc-category/${this.categoryName}${this.subCategoryName ? `/${this.subCategoryName}` : ''}`;
    return page <= 1 ? categoryPath : `${categoryPath}/page/${page}`;
  }

  private loadDiscsPage(pageNumber: number): void {
    const normalizedSubCategory = this.subCategoryName
      ? this.replaceAll.transform(this.subCategoryName, '-+', ' ')
      : undefined;

    this.discService
      .findDiscsPage({
        page: pageNumber,
        size: this.pageSize,
        type: this.categoryName,
        category: normalizedSubCategory,
        order: this.order === 'reset' ? undefined : this.order
      })
      .subscribe({
        next: (response: PagedResponse<Disc>) => {

          this.currentPage = response.page;
          if (this.totalPages === 0 || response.page === 1) {
            this.totalPages = response.totalPages;
          }
          this.totalItems = response.totalItems;
          this.discs = response.items;
          this.orderedDiscs = [...response.items];

          if (this.totalPages > 0 && this.currentPage > this.totalPages) {
            this.redirectToNotFoundPage();
            return;
          }

          if (this.discs.length === 0 && this.totalItems === 0) {
            this.redirectToNotFoundPage();
            return;
          }
        },
        error: () => {
          this.redirectToNotFoundPage();
        }
      });
  }

  private getPageNumber(pageParam: string | null): number | null {
    if (!pageParam) {
      return 1;
    }

    const pageNumber = Number(pageParam);

    if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
      return null;
    }

    return pageNumber;
  }
}