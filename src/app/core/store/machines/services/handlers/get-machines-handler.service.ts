import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MachinesApiService } from 'src/app/api/machines/machines-api.service';
import { NotificationService } from 'src/app/core/notifications/service/notification.service';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { Machine } from 'src/app/itf/machine.model';
import { MachinesActions } from '../../machines.actions';

@Injectable({
  providedIn: 'root',
})
export class GetMachinesHandlerService implements EffectHandler {
  private readonly errorMassage = 'Failed to fetch machines';

  constructor(
    private machinesApiService: MachinesApiService,
    private notificationService: NotificationService
  ) {}

  public handle(action: Action): Observable<Action> {
    return this.fetchMachines();
  }

  private fetchMachines(): Observable<Action> {
    return this.machinesApiService.getMachines().pipe(
      map((userProducts: Machine[]) => this.createSuccessAction(userProducts)),
      catchError(() => this.errorHandler())
    );
  }

  private createSuccessAction(machines: Machine[]): Action {
    return MachinesActions.GET_MACHINES_SUCCESS({
      machines,
    });
  }

  private errorHandler(): Observable<Action> {
    this.notificationService.error(this.errorMassage);
    return of(MachinesActions.GET_MACHINES_ERROR());
  }
}
