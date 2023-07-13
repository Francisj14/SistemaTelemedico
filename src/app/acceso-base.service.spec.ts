import { TestBed } from '@angular/core/testing';

import { AccesoBaseService } from './acceso-base.service';

describe('AccesoBaseService', () => {
  let service: AccesoBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesoBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
