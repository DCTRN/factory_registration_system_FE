/* eslint-disable @typescript-eslint/naming-convention */
enum MachinesUrl {
  MACHINES = 'machines',
  SENSORS = 'machines/sensor',
}

export abstract class Environment {
  public static readonly apiUrl = 'http://localhost:4000/';
  public static readonly machinesUrl = MachinesUrl;
}
