/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiscListComponent } from './disc-list.component';

describe('DiscListComponent', () => {
  let component: DiscListComponent;
  let fixture: ComponentFixture<DiscListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
