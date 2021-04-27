import { TestBed } from '@angular/core/testing';

import { PersonUpdateListenerService } from './person-update-listener.service';

describe('PersonUpdateListenerService', () => {
  let service: PersonUpdateListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonUpdateListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
