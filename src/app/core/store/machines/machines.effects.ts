/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, TypedAction } from '@ngrx/store/src/models';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MachinesActions } from './machines.actions';
import { MachinesEffectsHandlerService } from './services/machines-effects-handler.service';

@Injectable()
export class MachinesEffects {
  public getMachines = createEffect(() =>
    this.actions$.pipe(
      ofType(MachinesActions.GET_MACHINES),
      switchMap((action: TypedAction<string>) => this.handle(action))
    )
  );

  public addSensor = createEffect(() =>
    this.actions$.pipe(
      ofType(MachinesActions.ADD_SENSOR_RECORD),
      switchMap((action: TypedAction<string>) => this.handle(action))
    )
  );

  public updateSensor = createEffect(() =>
    this.actions$.pipe(
      ofType(MachinesActions.UPDATE_SENSOR_RECORD),
      switchMap((action: TypedAction<string>) => this.handle(action))
    )
  );

  public deleteSensor = createEffect(() =>
    this.actions$.pipe(
      ofType(MachinesActions.DELETE_SENSOR_RECORD),
      switchMap((action: TypedAction<string>) => this.handle(action))
    )
  );

  constructor(
    private actions$: Actions,
    private userProductsEffectsHandlerService: MachinesEffectsHandlerService
  ) {}

  private handle(action: TypedAction<string>): Observable<Action> {
    return this.userProductsEffectsHandlerService
      .createEffectHandler(action)
      .handle(action);
  }
}
