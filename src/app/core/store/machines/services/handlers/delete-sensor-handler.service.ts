import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MachinesApiService } from 'src/app/api/machines/machines-api.service';
import { NotificationService } from 'src/app/core/notifications/service/notification.service';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { MachinesActions } from '../../machines.actions';

@Injectable({
  providedIn: 'root',
})
export class DeleteSensorHandlerService implements EffectHandler {
  private readonly successMessage = 'Successfully deleted sensor';
  private readonly errorMassage = 'Failed to delete sensor';

  constructor(
    private machinesApiService: MachinesApiService,
    private notificationService: NotificationService
  ) {}

  public handle(action: { sensorId: number } & Action): Observable<Action> {
    return this.deleteUserProductRequest(action);
  }

  private deleteUserProductRequest(
    action: { sensorId: number } & Action
  ): Observable<Action> {
    return this.machinesApiService.deleteSensor(action.sensorId).pipe(
      map(() => this.createSuccessAction(action)),
      catchError(() => this.errorHandler())
    );
  }

  private createSuccessAction(action: { sensorId: number } & Action): Action {
    this.notificationService.success(this.successMessage);
    return MachinesActions.DELETE_SENSOR_RECORD_SUCCESS(action);
  }

  private errorHandler(): Observable<Action> {
    this.notificationService.error(this.errorMassage);
    return of(MachinesActions.DELETE_SENSOR_RECORD_ERROR());
  }
}
