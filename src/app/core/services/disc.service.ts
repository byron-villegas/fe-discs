import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc';
import { SubCategory } from '../models/subcategory';
import { environment } from 'src/environments/environment';
import { map, Observable, of, tap } from 'rxjs';

export interface PagedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class DiscService {
  private static readonly DISCS_STORAGE_KEY = 'discs';
  private static readonly FAVORITE_DISCS_STORAGE_KEY = 'favoriteDiscs';
  private static readonly PAGES_STORAGE_KEY = 'discs-page-cache';

  private discs: Disc[] = [];
  private favoriteDiscs: Disc[] = [];


  constructor(private http: HttpClient) {
    const storedDiscs = this.getSessionItem<Disc[]>(DiscService.DISCS_STORAGE_KEY);
    const storedFavoriteDiscs = this.getSessionItem<Disc[]>(DiscService.FAVORITE_DISCS_STORAGE_KEY);

    if (storedDiscs) {
      this.discs = storedDiscs;
    } else {
      this.findDiscs().subscribe(discs => {
        this.setDiscsCache(discs);
      });
    }

    if (storedFavoriteDiscs) {
      this.favoriteDiscs = storedFavoriteDiscs;
    }
  }

  findDiscs(): Observable<Disc[]> {
    if (this.discs.length > 0) {
      return of(this.discs);
    }

    return this.http
      .get<PagedResponse<Disc>>(`${environment.server.url}/${environment.server.paths.discs}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params: new HttpParams()
          .set('page', '1')
          .set('size', '15')
      })
      .pipe(
        map((response) => response.items),
        tap((items) => this.setDiscsCache(items))
      );
  }

  findFavoriteDiscs(): Observable<Disc[]> {
    if (this.favoriteDiscs.length > 0) {
      return of(this.favoriteDiscs);
    }

    return this.http
      .get<PagedResponse<Disc>>(`${environment.server.url}/${environment.server.paths.discs}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params: new HttpParams()
          .set('favorite', 'true')
          .set('page', '1')
          .set('size', '25')
      })
      .pipe(
        map((response) => response.items),
        tap((items) => this.setFavoriteDiscs(items))
      );
  }

  findDiscsPage(filters: {
    page: number;
    size: number;
    type?: string;
    category?: string;
    order?: string;
    favorite?: boolean;
  }): Observable<PagedResponse<Disc>> {
    const pageCache = this.getSessionItem<Record<string, PagedResponse<Disc>>>(DiscService.PAGES_STORAGE_KEY) ?? {};
    const cacheKey = this.getPageCacheKey(filters);
    const cachedPage = pageCache[cacheKey];

    if (cachedPage) {
      return of(cachedPage);
    }

    let params = new HttpParams()
      .set('page', String(filters.page))
      .set('size', String(filters.size));

    if (filters.type) {
      params = params.set('type', filters.type.toUpperCase());
    }

    if (filters.category) {
      params = params.set('categories', filters.category.toUpperCase());
    }

    if (filters.order) {
      params = params.set('order', filters.order);
    }

    if (typeof filters.favorite === 'boolean') {
      params = params.set('favorite', String(filters.favorite));
    }

    return this.http
      .get<PagedResponse<Disc>>(`${environment.server.url}/${environment.server.paths.discs}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        params
      })
      .pipe(
        tap((response) => {
          const nextPageCache = {
            ...pageCache,
            [cacheKey]: response
          };

          this.setSessionItem(DiscService.PAGES_STORAGE_KEY, nextPageCache);
        })
      );
  }

  getDiscs(): Disc[] {
    return this.discs;
  }

  getFavoriteDiscs(): Disc[] {
    let favoriteDiscs = sessionStorage.getItem('favoriteDiscs');

    if (favoriteDiscs) {
      this.favoriteDiscs = JSON.parse(favoriteDiscs);
    }
    return this.favoriteDiscs;
  }

  setFavoriteDiscs(discs: Disc[]): void {
    this.favoriteDiscs = discs;
    this.setSessionItem(DiscService.FAVORITE_DISCS_STORAGE_KEY, discs);
  }

  findDiscsByType(type: string): Disc[] {
    if (type == 'default') {
      return this.discs;
    }

    return this.discs.filter(disc => disc.type == type.toUpperCase());
  }

  findSubCategoriesOfCategory(categoryName: string): string[] {
    let discs = this.findDiscsByType(categoryName);

    let allCategories: string[] = [];

    discs
      .map(disc => { return disc.categories.filter(category => category != categoryName.toUpperCase()); })
      .forEach(categoria => {
        allCategories = allCategories.concat(categoria);
      });

    return [...new Set(allCategories)].sort((x, y) => x.localeCompare(y));
  }

  findDiscsSubCategories(): SubCategory {
    return {
      vinyls: this.findSubCategoriesOfCategory('vinyls'),
      cds: this.findSubCategoriesOfCategory('cds'),
      cassettes: this.findSubCategoriesOfCategory('cassettes')
    };
  }

  findDiscBySku(sku: string): Observable<Disc> {
    return this.http.get<Disc>(`${environment.server.url}/${environment.server.paths.discs}/${sku}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findDiscBySkuFromList(sku: string): Disc {
    return this.discs.find(disc => disc.sku == sku)!;
  }

  findDiscsByCategoryAndSubCategory(categoryName: string, subCategoryName: string): Disc[] {
    let discs = this.findDiscsByType(categoryName);

    return discs.filter(disc => disc.categories.includes(subCategoryName.toUpperCase()));
  }

  private setDiscsCache(discs: Disc[]): void {
    this.discs = discs;
    this.setSessionItem(DiscService.DISCS_STORAGE_KEY, discs);
  }

  private getPageCacheKey(filters: {
    page: number;
    size: number;
    type?: string;
    category?: string;
    order?: string;
    favorite?: boolean;
  }): string {
    return JSON.stringify({
      page: filters.page,
      size: filters.size,
      type: filters.type?.toUpperCase() ?? '',
      category: filters.category?.toUpperCase() ?? '',
      order: filters.order ?? '',
      favorite: filters.favorite === true
    });
  }

  private getSessionItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      sessionStorage.removeItem(key);
      return null;
    }
  }

  private setSessionItem<T>(key: string, data: T): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}