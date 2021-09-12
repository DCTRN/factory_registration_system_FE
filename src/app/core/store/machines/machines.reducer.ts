/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable no-underscore-dangle */
import { createReducer, on } from '@ngrx/store';
import { Machine } from 'src/app/itf/machine.model';
import { MachinesActions } from './machines.actions';
import { cloneDeep } from 'lodash';
import { Sensor } from 'src/app/itf/sensor.model';

export interface Machines {
  machines: Array<Machine>;
  currentlyDisplayedSensor: Sensor;
}

export const initialState: Machines = {
  machines: [],
  currentlyDisplayedSensor: undefined,
};

export const _machinesReducer = createReducer(
  initialState,

  // UPDATE_CURRENTLY_DISPLAYED_SENSOR
  on(MachinesActions.UPDATE_CURRENTLY_DISPLAYED_SENSOR, (state, action) => ({
    ...cloneDeep(state),
    currentlyDisplayedSensor: action.sensor,
  })),
  on(MachinesActions.CLEAR_CURRENTLY_DISPLAYED_SENSOR, (state, action) => ({
    ...cloneDeep(state),
    currentlyDisplayedSensor: undefined,
  })),

    // GET_MACHINE
  on(MachinesActions.GET_MACHINES, (state) => cloneDeep(state)),
  on(MachinesActions.GET_MACHINES_SUCCESS, (state, action) => action.machines),
  on(MachinesActions.GET_MACHINES_SUCCESS, (state) => cloneDeep(state)),

  // ADD_SENSOR_RECORD
  on(MachinesActions.ADD_SENSOR_RECORD, (state) => cloneDeep(state)),
  on(MachinesActions.ADD_SENSOR_RECORD_SUCCESS, (state, action) => {
    // for current implementation there is always machine for given sensor
    const machine: Machine = cloneDeep(
      state.machines.find((m: Machine) => m.id === action.machineId)
    );
    machine.sensors.push(action.sensor);
    return {
      ...state,
      machines: [
        ...state.machines.filter((m: Machine) => m.id !== action.machineId),
        machine,
      ],
    };
  }),
  on(MachinesActions.ADD_SENSOR_RECORD_ERROR, (state) => cloneDeep(state)),

  // UPDATE_SENSOR_RECORD
  on(MachinesActions.UPDATE_SENSOR_RECORD, (state) => cloneDeep(state)),
  on(MachinesActions.UPDATE_SENSOR_RECORD_SUCCESS, (state, action) => {
    // for current implementation there is always machine for given sensor
    let sensorIndex;
    const machineIndex = state.machines.findIndex((m: Machine) => {
      sensorIndex = m.sensors.findIndex(
        (s: Sensor) => s.id === action.sensor.id
      );
      return sensorIndex;
    });

    const machine: Machine = cloneDeep(state.machines[machineIndex]);
    machine.sensors[sensorIndex].value = action.sensor.value;
    machine.sensors[sensorIndex].description = action.sensor.description;

    return {
      ...state,
      machines: [
        ...state.machines.filter((m: Machine) => m.id !== machine.id),
        machine,
      ],
    };
  }),
  on(MachinesActions.UPDATE_SENSOR_RECORD_ERROR, (state) => cloneDeep(state)),

  // DELETE_SENSOR_RECORD
  on(MachinesActions.DELETE_SENSOR_RECORD, (state) => cloneDeep(state)),
  on(MachinesActions.DELETE_SENSOR_RECORD_SUCCESS, (state, action) => {
    // for current implementation there is always machine for given sensor
    let sensorIndex;
    const machineIndex = state.machines.findIndex((m: Machine) => {
      sensorIndex = m.sensors.findIndex(
        (s: Sensor) => s.id === action.sensorId
      );
      return sensorIndex;
    });

    const machine: Machine = cloneDeep(state.machines[machineIndex]);
    machine.sensors = machine.sensors.filter(
      (s: Sensor) => s.id !== action.sensorId
    );

    return {
      ...state,
      machines: [
        ...state.machines.filter((m: Machine) => m.id !== machine.id),
        machine,
      ],
    };
  }),
  on(MachinesActions.DELETE_SENSOR_RECORD_ERROR, (state) => cloneDeep(state))
);

export function machinesReducer(state, action) {
  return _machinesReducer(state, action);
}
