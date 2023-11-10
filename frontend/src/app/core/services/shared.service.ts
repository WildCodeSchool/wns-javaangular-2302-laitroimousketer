import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from 'src/app/modules/ticket/models/ticket';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private sidebarOpenedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpenedSubject.asObservable();
  // pour afficher le contenu voulu  dans sidebar//
  private currentContentSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  currentContent$ = this.currentContentSubject.asObservable();


  // ticket dans sidebar
  private currentTicketSubject: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>(new Ticket);
  currentTicket$ = this.currentTicketSubject.asObservable();
  // user dans sidebar
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
  currentUser$ = this.currentUserSubject.asObservable();

  mode: string = '';
  constructor() { }
  toggleSidebar(): void {
    // console.log('toggleSidebar() called', !this.sidebarOpenedSubject.value);
    this.sidebarOpenedSubject.next(!this.sidebarOpenedSubject.value);
  }
  setCurrentContent(content: string) {
    this.currentContentSubject.next(content);
  }

  setCurrentTicket(ticket: Ticket) {
    this.currentTicketSubject.next(ticket);
  }
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
}
