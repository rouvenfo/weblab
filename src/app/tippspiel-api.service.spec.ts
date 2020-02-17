import { TestBed } from '@angular/core/testing';

import { TippspielApiService } from './tippspiel-api.service';

describe('TippspielApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TippspielApiService = TestBed.get(TippspielApiService);
    expect(service).toBeTruthy();
  });
});
