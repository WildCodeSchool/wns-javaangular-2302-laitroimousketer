import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsubcribe',
  template: ''
})
export class UnsubcribeComponent implements OnDestroy {

  protected destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
