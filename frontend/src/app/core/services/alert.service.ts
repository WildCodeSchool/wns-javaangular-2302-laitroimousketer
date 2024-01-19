import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInMs = 5000;
  successMsg$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  errorMsg$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _snackBar: MatSnackBar) {}

  showSuccessAlert(successMsg: string, ) {
    this.successMsg$.next(successMsg);
    this.showSnackBar(successMsg, 'success');
  }

  showErrorAlert(errorMsg: string, ) {
    this.errorMsg$.next(errorMsg);
    this.showSnackBar(errorMsg, 'error');
  }
  
// TODO: customisation of this doesn't work
   showSnackBar(message: string, snackbarClass: string): void {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = this.horizontalPosition;
    config.verticalPosition = this.verticalPosition;
    config.duration = this.durationInMs;
    config.panelClass = snackbarClass;
    // console.log(snackbarClass,config.panelClass)
    this._snackBar.open(message, 'Close', config);
  }
  
}  

