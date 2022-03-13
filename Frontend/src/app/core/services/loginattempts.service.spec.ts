import { TestBed } from '@angular/core/testing';

import { LoginattemptsService } from './loginattempts.service';

describe('LoginattemptsService', () => {
  let service: LoginattemptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginattemptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
