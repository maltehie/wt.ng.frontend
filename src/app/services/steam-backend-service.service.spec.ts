import { TestBed } from '@angular/core/testing';

import { SteamBackendServiceService } from './steam-backend-service.service';

describe('SteamBackendServiceService', () => {
  let service: SteamBackendServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteamBackendServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
