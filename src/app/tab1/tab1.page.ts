/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MachinesActions } from '../core/store/machines/machines.actions';
import {
  selectAllMachines,
  selectCurrentlyDisplayedSensor,
} from '../core/store/machines/machines.selectors';
import { Machine } from '../itf/machine.model';
import { Sensor } from '../itf/sensor.model';
import { AppState } from '../reducers';
import { MachineViews } from './machine-views.model';
import { MachinesService } from './machines.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  public machines: Array<Machine> = [];
  public currentlyDisplayedSensor: Sensor;
  public view = MachineViews.LIST;
  public machineViews = MachineViews;

  private subscrptions = new Subscription();

  constructor(
    private store: Store<AppState>,
    private machinesService: MachinesService
  ) {}

  public ngOnInit(): void {
    this.subscribeToView();
    this.subscribeToMachines();
    this.subscribeToCurrentSensor();
  }

  public ngOnDestroy(): void {
    this.subscrptions.unsubscribe();
  }

  public onAddSensorClick(): void {
    this.machinesService.updateView(MachineViews.ADD);
  }

  public onGoBackClick(): void {
    this.machinesService.updateView(MachineViews.LIST);
  }

  public addSensor(machine: Machine): void {
    this.machinesService.updateView(MachineViews.ADD);
    this.machinesService.setCurrentMachine(machine);
  }

  public modifySensor(sensor: Sensor): void {
    this.store.dispatch(
      MachinesActions.UPDATE_CURRENTLY_DISPLAYED_SENSOR({ sensor })
    );
    this.machinesService.updateView(MachineViews.UPDATE);
  }

  public deleteSensor(sensorId: number): void {
    this.store.dispatch(MachinesActions.DELETE_SENSOR_RECORD({ sensorId }));
  }

  private subscribeToCurrentSensor() {
    this.subscrptions.add(
      this.store
        .select(selectCurrentlyDisplayedSensor)
        .subscribe((sensor: Sensor) => (this.currentlyDisplayedSensor = sensor))
    );
  }

  private subscribeToMachines() {
    this.subscrptions.add(
      this.store
        .select(selectAllMachines)
        .subscribe((machines: Array<Machine>) => (this.machines = machines))
    );
  }

  private subscribeToView(): void {
    this.subscrptions.add(
      this.machinesService
        .getView()
        .subscribe((view: MachineViews) => (this.view = view))
    );
  }
}
