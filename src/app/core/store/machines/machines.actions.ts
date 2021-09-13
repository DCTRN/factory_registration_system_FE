/* eslint-disable @typescript-eslint/naming-convention */
import { Action, createAction, props } from '@ngrx/store';
import { ErrorFormat } from 'src/app/itf/error-format.model';
import { Machine } from 'src/app/itf/machine.model';
import { Sensor } from 'src/app/itf/sensor.model';
import { Machines } from './machines.reducer';

export const getMachinesType = '[MACHINES] GET_MACHINES';
export const getMachinesSuccessType = '[MACHINES] GET_MACHINES_SUCCESS';
export const getMachinesErrorType = '[MACHINES] GET_MACHINES_ERROR';

export const addSensorRecordType = '[MACHINES] ADD_SENSOR_RECORD';
export const addSensorRecordSuccessType =
  '[MACHINES] ADD_SENSOR_RECORD_SUCCESS';
export const addSensorRecordErrorType = '[MACHINES] ADD_SENSOR_RECORD_ERROR';

export const updateSensorRecordType = '[MACHINES] UPDATE_SENSOR_RECORD';
export const updateSensorRecordSuccessType =
  '[MACHINES] UPDATE_SENSOR_RECORD_SUCCESS';
export const updateSensorRecordErrorType =
  '[MACHINES] UPDATE_SENSOR_RECORD_ERROR';

export const deleteSensorRecordType = '[MACHINES] DELETE_SENSOR_RECORD';
export const deleteSensorRecordSuccessType =
  '[MACHINES] DELETE_SENSOR_RECORD_SUCCESS';
export const deleteSensorRecordErrorType =
  '[MACHINES] DELETE_SENSOR_RECORD_ERROR';

export const updatecurrentlyDisplayedSensorType =
  '[MACHINES] UPDATE_CURRENTLY_DISPLAYED_SENSOR';
export const clearCurrentlyDisplayedSensorType =
  '[MACHINES] CLEAR_CURRENTLY_DISPLAYED_SENSOR';

export const updatecurrentlyDisplayedSensor = createAction(
  updatecurrentlyDisplayedSensorType,
  props<{ sensor: Sensor }>()
);
export const clearCurrentlyDisplayedSensor = createAction(
  clearCurrentlyDisplayedSensorType
);

export const getMachines = createAction(getMachinesType);
export const getMachinesSuccess = createAction(
  getMachinesType,
  props<{ machines: Array<Machine> }>()
);
export const getMachinesError = createAction(getMachinesType);

export const addSensorRecord = createAction(
  addSensorRecordType,
  props<{ sensor: Sensor; machineId: number }>()
);
export const addSensorRecordSuccess = createAction(
  addSensorRecordType,
  props<{ sensor: Sensor; machineId: number }>()
);
export const addSensorRecordError = createAction(addSensorRecordType);

export const updateSensorRecord = createAction(
  updateSensorRecordType,
  props<{ sensor: Partial<Sensor> }>()
);
export const updateSensorRecordSuccess = createAction(
  updateSensorRecordType,
  props<{ sensor: Sensor }>()
);
export const updateSensorRecordError = createAction(updateSensorRecordType);

export const deleteSensorRecord = createAction(
  deleteSensorRecordType,
  props<{ sensorId: number }>()
);
export const deleteSensorRecordSuccess = createAction(
  deleteSensorRecordType,
  props<{ sensorId: number }>()
);
export const deleteSensorRecordError = createAction(deleteSensorRecordType);

export const MachinesTypes = {
  UPDATE_CURRENTLY_DISPLAYED_SENSOR: updatecurrentlyDisplayedSensorType,
  CLEAR_CURRENTLY_DISPLAYED_SENSOR: clearCurrentlyDisplayedSensorType,

  GET_MACHINES: getMachinesType,
  GET_MACHINES_SUCCESS: getMachinesSuccessType,
  GET_MACHINES_ERROR: getMachinesErrorType,

  ADD_SENSOR_RECORD: addSensorRecordType,
  ADD_SENSOR_RECORD_SUCCESS: addSensorRecordSuccessType,
  ADD_SENSOR_RECORD_ERROR: addSensorRecordErrorType,

  UPDATE_SENSOR_RECORD: updateSensorRecordType,
  UPDATE_SENSOR_RECORD_SUCCESS: updateSensorRecordSuccessType,
  UPDATE_SENSOR_RECORD_ERROR: updateSensorRecordErrorType,

  DELETE_SENSOR_RECORD: deleteSensorRecordType,
  DELETE_SENSOR_RECORD_SUCCESS: deleteSensorRecordSuccessType,
  DELETE_SENSOR_RECORD_ERROR: deleteSensorRecordErrorType,
};

export const MachinesActions = {
  UPDATE_CURRENTLY_DISPLAYED_SENSOR: updatecurrentlyDisplayedSensor,
  CLEAR_CURRENTLY_DISPLAYED_SENSOR: clearCurrentlyDisplayedSensor,

  GET_MACHINES: getMachines,
  GET_MACHINES_SUCCESS: getMachinesSuccess,
  GET_MACHINES_ERROR: getMachinesError,

  ADD_SENSOR_RECORD: addSensorRecord,
  ADD_SENSOR_RECORD_SUCCESS: addSensorRecordSuccess,
  ADD_SENSOR_RECORD_ERROR: addSensorRecordError,

  UPDATE_SENSOR_RECORD: updateSensorRecord,
  UPDATE_SENSOR_RECORD_SUCCESS: updateSensorRecordSuccess,
  UPDATE_SENSOR_RECORD_ERROR: updateSensorRecordError,

  DELETE_SENSOR_RECORD: deleteSensorRecord,
  DELETE_SENSOR_RECORD_SUCCESS: deleteSensorRecordSuccess,
  DELETE_SENSOR_RECORD_ERROR: deleteSensorRecordError,
};
