import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DiscCategoryService } from '@services/disc-category.service';
import { DiscService } from '@services/disc.service';

import { DiscCategoryComponent } from './disc-category.component';

describe('DiscCategoryComponent', () => {
  let component: DiscCategoryComponent;
  let fixture: ComponentFixture<DiscCategoryComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, DiscCategoryComponent],
    providers: [
        Title,
        DiscCategoryService,
        {
            provide: ActivatedRoute,
            useValue: {
                paramMap: of(convertToParamMap({ categoryName: 'vinyls' }))
            }
        },
        {
            provide: DiscService,
            useValue: {
                findDiscsByType: () => [{
                        sku: 'TEST-123',
                        name: 'Disc',
                        description: '',
                        author: 'Author',
                        publisher: 'Publisher',
                        yearCreated: 2000,
                        country: 'CR',
                        images: [],
                        categories: ['VINYLS'],
                        trackList: [],
                        favorite: false,
                        type: 'VINYLS'
                    }],
                findDiscsByCategoryAndSubCategory: () => [],
                findDiscsSubCategories: () => ({ vinyls: [], cds: [], cassettes: [] }),
                findDiscsPage: () => of({
                  items: [{
                    sku: 'TEST-123',
                    name: 'Disc',
                    description: '',
                    author: 'Author',
                    publisher: 'Publisher',
                    yearCreated: 2000,
                    country: 'CR',
                    images: [],
                    categories: ['VINYLS'],
                    trackList: [],
                    favorite: false,
                    type: 'VINYLS'
                  }],
                  page: 1,
                  size: 15,
                  totalItems: 1,
                  totalPages: 1
                })
            }
        }
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
