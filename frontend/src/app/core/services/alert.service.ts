import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  successMsg$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  errorMsg$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  showSuccessAlert(successMsg: string) {
    this.successMsg$.next(successMsg);
  }

  showErrorAlert(errorMsg: string) {
    this.errorMsg$.next(errorMsg);
  }
}
