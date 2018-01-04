import { TestBed, inject } from '@angular/core/testing';
import { SessionService } from './app.service.session';

describe('SessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionService]
    });
  });

  it('should be created', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
});
