/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscService } from 'src/app/core/services/disc.service';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [CommonModule, RouterTestingModule, CategoriesComponent],
    providers: [{
            provide: DiscService,
            useValue: {
                findDiscsSubCategories: () => ({ vinyls: [], cds: [], cassettes: [] })
            }
        }]
})
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
