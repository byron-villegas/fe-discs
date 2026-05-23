/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { DiscService } from './disc.service';

describe('Service: Disc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), DiscService]
    });
  });

  it('should ...', inject([DiscService], (service: DiscService) => {
    expect(service).toBeTruthy();
  }));
});
