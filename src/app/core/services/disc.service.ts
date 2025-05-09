import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disc } from '../models/disc';
import { SubCategory } from '../models/subcategory';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscService {

  private discs: Disc[] = [];
  private favoriteDiscs: Disc[] = [];


  constructor(private http: HttpClient) {
    if (this.discs.length == 0) {
      this.findDiscs().subscribe(discs => {
        this.discs = discs;
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

  getDiscs(): Disc[] {
    return this.discs;
  }

  getFavoriteDiscs(): Disc[] {
    return this.favoriteDiscs;
  }

  setFavoriteDiscs(discs: Disc[]): void {
    this.favoriteDiscs = discs;
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
}