import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { DiscService } from '@services/disc.service';

import { FavoriteDiscsComponent } from './favorite-discs.component';

describe('FavoriteDiscsComponent', () => {
  let component: FavoriteDiscsComponent;
  let fixture: ComponentFixture<FavoriteDiscsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [CommonModule, FavoriteDiscsComponent],
    providers: [{
            provide: DiscService,
            useValue: {
                getFavoriteDiscs: () => [],
                findFavoriteDiscs: () => of([]),
                setFavoriteDiscs: () => undefined
            }
        }],
    schemas: [NO_ERRORS_SCHEMA]
})
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDiscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
