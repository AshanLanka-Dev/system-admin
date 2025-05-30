import { TestBed } from '@angular/core/testing';

import { ApplicationUserRoleService } from './application-user-role.service';

describe('ApplicationUserRoleService', () => {
  let service: ApplicationUserRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationUserRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
