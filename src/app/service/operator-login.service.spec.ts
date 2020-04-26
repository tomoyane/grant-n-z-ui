import { TestBed } from '@angular/core/testing';

import { OperatorLoginService } from './operator-login.service';

describe('OperatorLoginService', () => {
  let service: OperatorLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
