import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from 'src/app/modules/ticket/models/ticket';

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


  private ticketDetailsSubject: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>(new Ticket);
  ticketDetails$ = this.ticketDetailsSubject.asObservable();

  //pour s'abonné à un ticket et l'affiché aillleurs sur ticketModule par exemple
  private currentTicketSubject: BehaviorSubject<Ticket> = new BehaviorSubject<Ticket>(new Ticket);
  currentTicket$ = this.currentTicketSubject.asObservable();


  mode: string = '';
  constructor() {}
  toggleSidebar(): void {
    console.log('toggleSidebar() called', !this.sidebarOpenedSubject.value);
    this.sidebarOpenedSubject.next(!this.sidebarOpenedSubject.value);
  }
  setCurrentContent(content: string) {
    this.currentContentSubject.next(content);
  }

  setCurrentTicket(ticket: Ticket) {
    this.currentTicketSubject.next(ticket);
  }
}
