import { Component, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/core/models/subcategory';
import { DiscService } from 'src/app/core/services/disc.service';

@Component({
  selector: 'app-home-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  subCategorias: SubCategory = { vinyls: [], cds: [], cassettes: [] };
  
  constructor(private discService: DiscService) {

  }

  ngOnInit() {
    this.subCategorias = this.discService.findDiscsSubCategories();
  }
}