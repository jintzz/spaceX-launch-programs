import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LauchManagerService } from './lauch-manager.service';

describe('LauchManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: LauchManagerService = TestBed.get(LauchManagerService);
    expect(service).toBeTruthy();
  });
});
