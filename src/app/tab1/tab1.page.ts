/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
    this.subscrptions.add(
      this.machinesService
        .getView()
        .subscribe((view: MachineViews) => (this.view = view))
    );
    this.subscrptions.add(
      this.store
        .select(selectAllMachines)
        .subscribe((machines: Array<Machine>) => (this.machines = machines))
    );

    this.subscrptions.add(
      this.store
        .select(selectCurrentlyDisplayedSensor)
        .subscribe((sensor: Sensor) => (this.currentlyDisplayedSensor = sensor))
    );
  }
  public ngOnDestroy(): void {
    this.subscrptions.unsubscribe();
  }
}
