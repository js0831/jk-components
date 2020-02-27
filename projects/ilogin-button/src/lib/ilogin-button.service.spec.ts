import { TestBed } from '@angular/core/testing';

import { IloginButtonService } from './ilogin-button.service';

describe('IloginButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IloginButtonService = TestBed.get(IloginButtonService);
    expect(service).toBeTruthy();
  });
});
