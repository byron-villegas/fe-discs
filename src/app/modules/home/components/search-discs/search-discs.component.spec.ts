import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscService } from '@services/disc.service';

import { SearchDiscsComponent } from './search-discs.component';

describe('SearchDiscsComponent', () => {
  let component: SearchDiscsComponent;
  let fixture: ComponentFixture<SearchDiscsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, SearchDiscsComponent],
    providers: [{
            provide: DiscService,
            useValue: {
                getDiscs: () => []
            }
        }]
})
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDiscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
