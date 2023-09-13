import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sidebarOpenedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpenedSubject.asObservable();
constructor() { }
toggleSidebar(): void {
  console.log('toggleSidebar() called', !this.sidebarOpenedSubject.value);
  this.sidebarOpenedSubject.next(!this.sidebarOpenedSubject.value);
}
}
