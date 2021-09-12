import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/core/environment';
import { propagateError } from 'src/app/core/rxjs-operators/propagate-error';
import { Machine } from 'src/app/itf/machine.model';
import { Sensor } from 'src/app/itf/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class MachinesApiService {
  private readonly apiUrl = Environment.apiUrl;
  private readonly machinesUrl = this.apiUrl + Environment.machinesUrl.MACHINES;
  private readonly sensorsUrl = this.apiUrl + Environment.machinesUrl.SENSORS;

  constructor(private httpClient: HttpClient) {}

  public getMachines(): Observable<Machine[]> {
    return this.httpClient
      .get<Machine[]>(this.machinesUrl)
      .pipe(propagateError());
  }

  public addSensor(sensor: {
    sensor: Sensor;
    machineId: number;
  }): Observable<Sensor> {
    return this.httpClient
      .post<Sensor>(this.sensorsUrl, sensor)
      .pipe(propagateError());
  }

  public updateSensor(sensor: Partial<Sensor>): Observable<Sensor> {
    return this.httpClient
      .patch<Sensor>(this.sensorsUrl, sensor)
      .pipe(propagateError());
  }

  public deleteSensor(sensorId: number): Observable<Object> {
    return this.httpClient
      .request('DELETE', this.machinesUrl, {
        body: sensorId,
      })
      .pipe(propagateError());
  }
}
