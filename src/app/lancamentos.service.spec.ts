import { TestBed, inject } from '@angular/core/testing';

import { LancamentosService } from './lancamentos.service';

describe('LancamentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LancamentosService]
    });
  });

  it('should be created', inject([LancamentosService], (service: LancamentosService) => {
    expect(service).toBeTruthy();
  }));
});
