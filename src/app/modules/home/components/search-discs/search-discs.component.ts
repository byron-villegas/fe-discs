import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disc } from 'src/app/core/models/disc';
import { DiscService } from 'src/app/core/services/disc.service';

@Component({
  selector: 'app-home-search-discs',
  templateUrl: './search-discs.component.html',
  styleUrls: ['./search-discs.component.css']
})
export class SearchDiscsComponent implements OnInit {
  searchText: string = '';
  discs: Disc[] = [];

  constructor(private router: Router, private discService: DiscService) { }

  ngOnInit() {

  }

  // SE EJECUTA CUANDO TERMINA DE MOSTRARSE EL COMPONENTE
  ngAfterViewChecked() {
    setTimeout(() => {
      document.getElementById('search')!.focus();
    }, 500);
  }

  searchChange(value: string): void {
    this.searchText = value;

    if (this.searchText.length != 0) {
      this.discs = this.discService.findDiscsByType('default')
        .filter(p => 
          p.sku.toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.name.toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.author.toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.publisher.toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.yearCreated.toString().toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.country.toString().toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.description.toUpperCase().includes(this.searchText.toUpperCase()) ||
          p.categories.filter(category => category.includes(this.searchText.toUpperCase())).length > 0 ||
          p.trackList.filter(track => track.name.toUpperCase().includes(this.searchText.toUpperCase())).length > 0 )
    } else {
      this.discs = [];
    }
  }

  viewDisc(sku: string): void {
    this.router.navigate(['/disc/' + sku]);
    return;
  }

  clearSearch(): void {
    this.searchText = '';
    this.discs = [];
  }
}