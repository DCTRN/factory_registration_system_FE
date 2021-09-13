import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Machine } from '../itf/machine.model';
import { MachineViews } from './machine-views.model';

@Injectable({
  providedIn: 'root',
})
export class MachinesService {
  private view$ = new BehaviorSubject<MachineViews>(MachineViews.LIST);

  private currentMachine: Machine;
  constructor() {}

  public getView(): Observable<MachineViews> {
    return this.view$.asObservable();
  }

  public updateView(view: MachineViews): void {
    this.view$.next(view);
  }

  public setCurrentMachine(machine: Machine): void {
    this.currentMachine = machine;
  }

  public getCurrentMachine(): Machine {
    return this.currentMachine;
  }
}
