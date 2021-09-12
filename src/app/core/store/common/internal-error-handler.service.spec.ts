import { getTestBed, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { internalError } from './internal-error-action.model';

import { InternalErrorHandlerService } from './internal-error-handler.service';

describe('InternalErrorHandlerService', () => {
  let injector: TestBed;
  let service: InternalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  beforeEach(() => {
    injector = getTestBed();
    service = injector.inject(InternalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return internal error action', () => {
    let action: Action;

    service.handle().subscribe((a) => (action = a));

    expect(action).toEqual(internalError());
  });
});
