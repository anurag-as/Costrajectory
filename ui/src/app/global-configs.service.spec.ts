import { TestBed } from '@angular/core/testing';

import { GlobalConfigsService } from './global-configs.service';

describe('GlobalConfigsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalConfigsService = TestBed.get(GlobalConfigsService);
    expect(service).toBeTruthy();
  });
});
