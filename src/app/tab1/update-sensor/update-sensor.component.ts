import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { MachineViews } from '../machine-views.model';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private machinesService: MachinesService
  ) {}

  public ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.machinesService.updateView(MachineViews.LIST);
  }
}
