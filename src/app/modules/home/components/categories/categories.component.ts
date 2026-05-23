import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { SubCategory } from '@models/subcategory';
import { DiscService } from '@services/disc.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    imports: [RouterLink, NgIf]
})
export class CategoriesComponent implements OnInit {
  subCategorias: SubCategory = { vinyls: [], cds: [], cassettes: [] };
  
  constructor(private discService: DiscService) {

  }

  ngOnInit() {
    this.subCategorias = this.discService.findDiscsSubCategories();
  }
}