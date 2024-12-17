/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiscViewComponent } from './disc-view.component';

describe('DiscViewComponent', () => {
  let component: DiscViewComponent;
  let fixture: ComponentFixture<DiscViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
