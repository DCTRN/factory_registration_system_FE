import { Injectable, Injector, Type } from '@angular/core';
import { TypedAction } from '@ngrx/store/src/models';
import { EffectFactory } from 'src/app/itf/effect-factory.interface';
import { EffectHandler } from 'src/app/itf/effect-handler.interface';
import { InternalErrorHandlerService } from '../../common/internal-error-handler.service';
import { MachinesTypes } from '../machines.actions';
import { AddSensorHandlerService } from './handlers/add-sensor-handler.service';
import { DeleteSensorHandlerService } from './handlers/delete-sensor-handler.service';
import { GetMachinesHandlerService } from './handlers/get-machines-handler.service';
import { UpdateSensorHandlerService } from './handlers/update-sensor-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MachinesEffectsHandlerService implements EffectFactory {
  private actionHandlers: { [key: string]: Type<EffectHandler> } = {
    [MachinesTypes.GET_MACHINES]: GetMachinesHandlerService,
    [MachinesTypes.ADD_SENSOR_RECORD]: AddSensorHandlerService,
    [MachinesTypes.UPDATE_SENSOR_RECORD]: UpdateSensorHandlerService,
    [MachinesTypes.DELETE_SENSOR_RECORD]: DeleteSensorHandlerService,
  };
  private internalErrorHandlerService: Type<EffectHandler> =
    InternalErrorHandlerService;

  constructor(private injector: Injector) {}

  public createEffectHandler(action: TypedAction<string>): EffectHandler {
    const token: Type<EffectHandler> =
      this.actionHandlers?.[action.type] || this.internalErrorHandlerService;
    return this.injector.get(token);
  }
}
