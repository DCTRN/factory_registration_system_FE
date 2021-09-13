import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MachinesApiService } from 'src/app/api/machines/machines-api.service';
import { NotificationService } from 'src/app/core/notifications/service/notification.service';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { Sensor } from 'src/app/itf/sensor.model';
import { MachinesActions } from '../../machines.actions';

@Injectable({
  providedIn: 'root',
})
export class UpdateSensorHandlerService implements EffectHandler {
  private readonly successMessage = 'Successfuly updated sensor';
  private readonly errorMessage = 'Failed to update sensor';

  constructor(
    private machinesApiService: MachinesApiService,
    private notificationService: NotificationService
  ) {}

  public handle(
    action: { sensor: Partial<Sensor> } & Action
  ): Observable<Action> {
    return this.updateProduct(action);
  }

  private updateProduct(
    action: { sensor: Partial<Sensor> } & Action
  ): Observable<Action> {
    return this.machinesApiService.updateSensor(action.sensor).pipe(
      map((sensor: Sensor) => this.createSuccessAction(sensor)),
      catchError(() => this.errorHandler())
    );
  }

  private createSuccessAction(sensor: Sensor): Action {
    return MachinesActions.UPDATE_SENSOR_RECORD_SUCCESS({
      sensor,
    });
  }

  private errorHandler(): Observable<Action> {
    this.notificationService.error(this.errorMessage);
    return of(MachinesActions.UPDATE_SENSOR_RECORD_ERROR());
  }
}
