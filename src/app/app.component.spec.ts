import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DiscService } from './core/services/disc.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        AppComponent
    ],
    providers: [{
      provide: DiscService,
      useValue: {
        findDiscsSubCategories: () => ({ vinyls: [], cds: [], cassettes: [] }),
        getFavoriteDiscs: () => [],
        findFavoriteDiscs: () => of([]),
        setFavoriteDiscs: () => undefined,
        getDiscs: () => []
      }
    }],
    schemas: [NO_ERRORS_SCHEMA]
}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
