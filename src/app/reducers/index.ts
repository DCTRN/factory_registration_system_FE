import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  Machines,
  machinesReducer,
} from '../core/store/machines/machines.reducer';

export interface AppState {
  machines: Machines;
}

export const reducers: ActionReducerMap<AppState> = {
  machines: machinesReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
