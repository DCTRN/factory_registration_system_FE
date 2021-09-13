import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MachinesApiService } from 'src/app/api/machines/machines-api.service';
import { NotificationService } from 'src/app/core/notifications/service/notification.service';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { Sensor } from 'src/app/itf/sensor.model';
import { MachinesActions } from '../../machines.actions';

type SensorWithMachineId = {
  sensor: Sensor;
  machineId: number;
};

@Injectable({
  providedIn: 'root',
})
export class AddSensorHandlerService implements EffectHandler {
  private readonly successMessage = 'Successfully added sensor';
  private readonly errorMessage = 'Failed to add sensor';

  constructor(
    private machinesApiService: MachinesApiService,
    private notificationService: NotificationService
  ) {}

  public handle(
    action: { sensor: Sensor; machineId: number } & Action
  ): Observable<Action> {
    return this.addSensor(action);
  }

  private addSensor(action: SensorWithMachineId & Action): Observable<Action> {
    return this.machinesApiService.addSensor(action).pipe(
      map((sensor: Sensor) =>
        this.createSuccessAction({ sensor, machineId: action.machineId })
      ),
      tap(() => this.notificationService.success(this.successMessage)),
      catchError(() => this.errorHandler())
    );
  }

  private createSuccessAction(action: SensorWithMachineId): Action {
    return MachinesActions.ADD_SENSOR_RECORD_SUCCESS(action);
  }

  private errorHandler(): Observable<Action> {
    this.notificationService.error(this.errorMessage);
    return of(MachinesActions.ADD_SENSOR_RECORD_ERROR());
  }
}
