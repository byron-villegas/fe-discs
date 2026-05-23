import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Disc } from '@models/disc';
import { DiscService } from '@services/disc.service';
import { ImageRoutePipe } from '@pipes/image-route.pipe';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-home-search-discs',
  templateUrl: './search-discs.component.html',
  styleUrls: ['./search-discs.component.css'],
  imports: [RouterLink, ImageRoutePipe, NgIf, NgForOf],
})
export class SearchDiscsComponent implements OnInit {
  searchText: string = '';
  discs: Disc[] = [];

  constructor(
    private router: Router,
    private discService: DiscService,
  ) {}

  ngOnInit() {}

  // SE EJECUTA CUANDO TERMINA DE MOSTRARSE EL COMPONENTE
  ngAfterViewChecked() {
    setTimeout(() => {
      document.getElementById('search')!.focus();
    }, 500);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      // Limpia la búsqueda al cerrar el offcanvas
      const offcanvas = document.getElementById('offcanvasBottom');
      if (offcanvas) {
        offcanvas.addEventListener('hidden.bs.offcanvas', () => {
          this.clearSearch();
        });
      }
    }, 500);
  }

  searchChange(value: string): void {
    this.searchText = value;

    if (this.searchText.length === 0) {
      this.discs = [];
      return;
    }

    let allDiscs = this.discService.getDiscs();

    let discsFindBySku = allDiscs.filter((disc) =>
      disc.sku.toUpperCase().includes(this.searchText.toUpperCase()),
    );

    let discsFindByName = allDiscs.filter((disc) =>
      disc.name.toUpperCase().includes(this.searchText.toUpperCase()),
    );

    let discsFindByAuthor = allDiscs.filter((disc) =>
      disc.author.toUpperCase().includes(this.searchText.toUpperCase()),
    );

    let discsFindByPublisher = allDiscs.filter((disc) =>
      disc.publisher.toUpperCase().includes(this.searchText.toUpperCase()),
    );

    let discsFindByYearCreated = allDiscs.filter((disc) =>
      disc.yearCreated
        .toString()
        .toUpperCase()
        .includes(this.searchText.toUpperCase()),
    );

    let discsFindByCountry = allDiscs.filter((disc) =>
      disc.country
        .toString()
        .toUpperCase()
        .includes(this.searchText.toUpperCase()),
    );

    let discsFindByCategory = allDiscs.filter(
      (disc) =>
        disc.categories.filter((category) =>
          category.includes(this.searchText.toUpperCase()),
        ).length > 0,
    );

    let discsFindByTrack = allDiscs.filter(
      (disc) =>
        disc.trackList.filter((track) =>
          track.name.toUpperCase().includes(this.searchText.toUpperCase()),
        ).length > 0,
    );

    this.discs = [
      ...new Set([
        ...discsFindBySku,
        ...discsFindByName,
        ...discsFindByAuthor,
        ...discsFindByPublisher,
        ...discsFindByYearCreated,
        ...discsFindByCountry,
        ...discsFindByCategory,
        ...discsFindByTrack,
      ]),
    ];
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
