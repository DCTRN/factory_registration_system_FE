/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { of, Subject } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

export enum NotificationType {
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

export enum NotificationsColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  LIGHT = 'light',
  MEDIUM = 'medium',
  DARK = 'dark',
}

export interface NotificationHandlerMetaData {
  message: string;
  duration: number;
  color: NotificationsColor;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private openSnackBar$ = new Subject<NotificationHandlerMetaData>();
  private readonly delayDelta = 200;

  constructor(private toastController: ToastController) {
    this.notificationEventsHandler();
  }

  public success(message: string, duration: number = 3000): void {
    this.openSnackBar$.next({
      message,
      duration,
      color: NotificationsColor.SUCCESS,
    });
  }

  public error(message: string, duration: number = 3000): void {
    this.openSnackBar$.next({
      message,
      duration,
      color: NotificationsColor.DANGER,
    });
  }

  public warning(message: string, duration: number = 3000): void {
    this.openSnackBar$.next({
      message,
      duration,
      color: NotificationsColor.WARNING,
    });
  }

  public info(message: string, duration: number = 3000): void {
    this.openSnackBar$.next({
      message,
      duration,
      color: NotificationsColor.PRIMARY,
    });
  }

  private notificationEventsHandler() {
    this.openSnackBar$
      .pipe(
        concatMap((d) =>
          of(this.presentToast(d)).pipe(delay(this.delayDelta + d.duration))
        )
      )
      .subscribe();
  }

  private async presentToast(
    notificationHandlerMetaData: NotificationHandlerMetaData
  ): Promise<void> {
    try {
      const toast = await this.toastController.create(
        notificationHandlerMetaData
      );
      toast.present();
    } catch (e) {
      // TODO do error handling
      console.warn('Error while doing notification');
    }
  }
}
