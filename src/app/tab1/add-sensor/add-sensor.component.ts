import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MachinesActions } from 'src/app/core/store/machines/machines.actions';
import { Sensor } from 'src/app/itf/sensor.model';
import { AppState } from 'src/app/reducers';
import { MachineViews } from '../machine-views.model';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss'],
})
export class AddSensorComponent implements OnInit, OnDestroy {
  public valueFormControl: FormControl;
  public descriptionFormControl: FormControl;

  private description: string;
  private value: number;
  private subscriptions = new Subscription();
  constructor(
    private store: Store<AppState>,
    private machinesService: MachinesService
  ) {}

  public ngOnInit(): void {
    this.createformControls();
    this.subscribeToValueFormChanges();
    this.subscribeToDescriptionFormChanges();
  }

  public ngOnDestroy(): void {
    this.machinesService.updateView(MachineViews.LIST);
  }

  public onClick(): void {
    this.store.dispatch(
      MachinesActions.ADD_SENSOR_RECORD(this.createAddSensorRecordAction())
    );
    this.valueFormControl.reset();
    this.descriptionFormControl.reset();
  }

  private subscribeToDescriptionFormChanges(): void {
    this.subscriptions.add(
      this.descriptionFormControl.valueChanges.subscribe(
        (v) => (this.description = v)
      )
    );
  }

  private subscribeToValueFormChanges(): void {
    this.subscriptions.add(
      this.valueFormControl.valueChanges.subscribe(
        (v: number) => (this.value = Math.floor(Number(v)))
      )
    );
  }

  private createAddSensorRecordAction(): { sensor: Sensor; machineId: number } {
    return {
      sensor: {
        value: this.value,
        description: this.description,
      },
      machineId: this.machinesService.getCurrentMachine()?.id || 0,
    };
  }

  private createformControls(): void {
    this.createKcalFormControl();
    this.createProteinFormControl();
  }

  private createKcalFormControl(): void {
    this.valueFormControl = new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(10000),
    ]);
  }

  private createProteinFormControl(): void {
    this.descriptionFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]);
  }
}
