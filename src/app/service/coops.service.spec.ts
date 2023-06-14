import { TestBed } from '@angular/core/testing';

import { CoopsService } from './coops.service';

describe('CoopsService', () => {
  let service: CoopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
