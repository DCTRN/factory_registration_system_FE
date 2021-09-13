import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MachinesActions } from 'src/app/core/store/machines/machines.actions';
import { selectCurrentlyDisplayedSensor } from 'src/app/core/store/machines/machines.selectors';
import { Sensor } from 'src/app/itf/sensor.model';
import { AppState } from 'src/app/reducers';
import { MachineViews } from '../machine-views.model';
import { MachinesService } from '../machines.service';

@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent implements OnInit, OnDestroy {
  public valueFormControl: FormControl;
  public descriptionFormControl: FormControl;
  public value: number;
  public description: string;
  public originalSensor: Sensor;

  private subscriptions = new Subscription();
  constructor(
    private store: Store<AppState>,
    private machinesService: MachinesService
  ) {}

  public ngOnInit(): void {
    this.createformControls();
    this.store
      .select(selectCurrentlyDisplayedSensor)
      .subscribe((sensor: Sensor) => this.updateSensor(sensor));
    this.subscribeToValueFormChanges();
    this.subscribeToDescriptionFormChanges();
  }

  public ngOnDestroy(): void {
    this.machinesService.updateView(MachineViews.LIST);
    this.store.dispatch(MachinesActions.CLEAR_CURRENTLY_DISPLAYED_SENSOR());
  }

  public onClick(): void {
    this.store.dispatch(
      MachinesActions.UPDATE_SENSOR_RECORD(
        this.createUpdateSensorRecordAction()
      )
    );
    this.valueFormControl.reset();
    this.descriptionFormControl.reset();
  }

  public onGoBackClick(): void {
    this.machinesService.updateView(MachineViews.LIST);
  }

  private updateSensor(sensor: Sensor) {
    this.value = sensor?.value;
    this.description = sensor?.description;
    this.originalSensor = { ...sensor };
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

  private createUpdateSensorRecordAction(): { sensor: Partial<Sensor> } {
    return {
      sensor: {
        value: this.value,
        description: this.description,
      },
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
