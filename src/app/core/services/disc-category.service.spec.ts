/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscCategoryService } from './disc-category.service';

describe('Service: DiscCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscCategoryService]
    });
  });

  it('should ...', inject([DiscCategoryService], (service: DiscCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
