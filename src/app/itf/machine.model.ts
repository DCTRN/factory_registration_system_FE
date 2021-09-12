import { Sensor } from './sensor.model';

export interface Machine {
  id?: number;
  sensors: Array<Sensor>;
  name: string;
}
