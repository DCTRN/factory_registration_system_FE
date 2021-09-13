import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Machines } from './machines.reducer';

export const machinesKey = 'machines';

export const selectMachinesState = createFeatureSelector<AppState, Machines>(
  machinesKey
);

export const selectCurrentlyDisplayedSensor = createSelector(
  selectMachinesState,
  (state: Machines) => state.currentlyDisplayedSensor
);

export const selectAllMachines = createSelector(
  selectMachinesState,
  (state: Machines) => state.machines
);
