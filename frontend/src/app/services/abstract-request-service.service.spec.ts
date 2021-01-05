import { TestBed } from '@angular/core/testing';

import { AbstractRequestServiceService } from './abstract-request-service.service';

describe('AbstractRequestServiceService', () => {
  let service: AbstractRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
