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

  private discs: Disc[] = [];

  constructor(private http: HttpClient) {
    if(this.discs.length == 0) {
      this.findDiscs().subscribe(resp => {
        this.discs = resp;
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

  findDiscsByType(type: string): Disc[] {
    return this.discs.filter(disc => disc.type == type.toUpperCase());
  }

  findDiscsByCategory(categoryName: string): Disc[] {

    if (categoryName == 'default') {
      return this.discs;
    }

    return this.discs.filter(disc => disc.categories.includes(categoryName.toUpperCase()));
  }

  findSubCategoriesOfCategory(categoryName: string): string[] {
    let discs = this.findDiscsByCategory('default');

    let allCategories: string[] = [];

    discs
      .filter(disc => disc.categories.includes(categoryName.toUpperCase())) // FILTRAR DISCOS QUE INCLUYAN CATEGORIA PADRE
      .map(disc => { return disc.categories.filter(category => category != categoryName.toUpperCase()); })
      .forEach(categoria => {
        allCategories = allCategories.concat(categoria);
      });

    return [...new Set(allCategories)].sort((x, y) => x.localeCompare(y));
  }

  findDiscsSubCategories(): SubCategory {
    return {
      vinyls: this.findSubCategoriesOfCategory('vinilos'),
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
    let discs = this.findDiscsByCategory('default');
    return discs.filter(disc => disc.categories.includes(categoryName.toUpperCase()) && disc.categories.includes(subCategoryName.toUpperCase()));
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