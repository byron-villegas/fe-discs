/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscService } from './disc.service';

describe('Service: Disc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscService]
    });
  });

  it('should ...', inject([DiscService], (service: DiscService) => {
    expect(service).toBeTruthy();
  }));
});
