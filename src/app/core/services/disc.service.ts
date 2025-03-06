import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc';
import { SubCategory } from '../models/subcategory';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscService {

  private static discs: Disc[] = [];

  private static favoriteDiscs: Disc[] = [];

  constructor(private http: HttpClient) {
    if(DiscService.discs.length == 0) {
      this.findDiscs().subscribe(resp => {
        DiscService.discs = resp;
      });
    }
  }

  findDiscs(): Observable<Disc[]> {
    return this.http.get<Disc[]>(`${environment.server.url}/${environment.server.paths.discs}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  findFavoriteDiscs(): Observable<Disc[]> {
    return this.http.get<Disc[]>(`${environment.server.url}/${environment.server.paths.discs}?favorite=true`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  setFavoriteDiscs(favoriteDiscs: Disc[]): void {
    DiscService.favoriteDiscs = favoriteDiscs;
  }

  getFavoriteDiscs(): Disc[] {
    return DiscService.favoriteDiscs;
  }

  findDiscsByType(type: string): Disc[] {
    if (type == 'default') {
      return DiscService.discs;
    }

    return DiscService.discs.filter(disc => disc.type == type.toUpperCase());
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
    return DiscService.discs.find(disc => disc.sku == sku)!;
  }

  findDiscsByCategoryAndSubCategory(categoryName: string, subCategoryName: string): Disc[] {
    let discs = this.findDiscsByType(categoryName);

    return discs.filter(disc => disc.categories.includes(subCategoryName.toUpperCase()));
  }

  getFavoriteDiscsOnLocalStorage(): Disc[] {
    let data = localStorage.getItem('favoriteDiscs');

    if(!data) {
      return [];
    }

    return JSON.parse(data);
  }

  saveFavoriteDiscsOnLocalStorage(favoriteDiscs: Disc[]): void {
    localStorage.setItem('favoriteDiscs', JSON.stringify(favoriteDiscs));
  }
}