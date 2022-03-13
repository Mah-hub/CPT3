import { TestBed } from '@angular/core/testing';

import { RolesandpermissionsService } from './rolesandpermissions.service';

describe('RolesandpermissionsService', () => {
  let service: RolesandpermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesandpermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
