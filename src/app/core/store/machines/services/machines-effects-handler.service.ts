import { Injectable, Injector, Type } from '@angular/core';
import { InternalErrorHandlerService } from '@core/stores/common/internal-error-handler.service';
import { EffectFactory } from '@core/stores/models/effect-factory.interface';
import { EffectHandler } from '@core/stores/models/effect-handler.interface';
import { TypedAction } from '@ngrx/store/src/models';
import { UserProductsActionType } from '../user-products.actions';
import { AddSensorHandlerService } from './handlers/add-sensor-handler.service';
import { DeleteSensorHandlerService } from './handlers/delete-sensor-handler.service';
import { GetMachinesHandlerService } from './handlers/get-machines-handler.service';
import { GetUserProductsByDateRangeHandlerService } from './handlers/get-user-products-by-date-range-handler.service';
import { UpdateSensorHandlerService } from './handlers/update-sensor-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserProductsEffectsHandlerService implements EffectFactory {
  private actionHandlers: { [key: string]: Type<EffectHandler> } = {
    [UserProductsActionType.GET_USER_PRODUCTS_BY_DATE_REQUEST]: GetMachinesHandlerService,
    [UserProductsActionType.GET_USER_PRODUCTS_BY_DATE_RANGE_REQUEST]: GetUserProductsByDateRangeHandlerService,
    [UserProductsActionType.ADD_USER_PRODUCT_REQUEST]: AddSensorHandlerService,
    [UserProductsActionType.UPDATE_USER_PRODUCT_REQUEST]: UpdateSensorHandlerService,
    [UserProductsActionType.DELETE_USER_PRODUCT_REQUEST]: DeleteSensorHandlerService,
  };
  private internalErrorHandlerService: Type<EffectHandler> = InternalErrorHandlerService;

  constructor(private injector: Injector) {}

  public createEffectHandler(action: TypedAction<string>): EffectHandler {
    const token: Type<EffectHandler> =
      this.actionHandlers?.[action.type] || this.internalErrorHandlerService;
    return this.injector.get(token);
  }
}
