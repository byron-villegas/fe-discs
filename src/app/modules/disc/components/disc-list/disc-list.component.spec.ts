import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscListComponent } from './disc-list.component';

describe('DiscListComponent', () => {
  let component: DiscListComponent;
  let fixture: ComponentFixture<DiscListComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
    imports: [DiscListComponent]
})
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
