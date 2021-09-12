import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { internalError } from './internal-error-action.model';

@Injectable({
  providedIn: 'root',
})
export class InternalErrorHandlerService implements EffectHandler {
  public handle(action?: Action): Observable<Action> {
    return of(internalError());
  }
}
