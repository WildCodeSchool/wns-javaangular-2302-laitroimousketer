import { Component, Input, OnInit } from '@angular/core';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  animations: [
    trigger('opacity', [
      transition('void => active', [
        style({ opacity: '0' }),
        animate('0.4s', style({ opacity: '1' }))
      ]),
      transition('* => void', [
        animate(40, style({ opacity: '0' }))
      ])
    ])
  ]
})
export class TicketDetailsComponent extends UnsubcribeComponent implements OnInit {

  ticket!: Ticket;
  menuItems: MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill' },
    { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
    { page: 'Actions', icon: 'bi bi-pencil-square' }
  ];
  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-tag-fill';
  fullnameAuthor : string = '';
  canClose: boolean = false;
  page: string = 'Info';
  statutSpan: string = '';
  prioritySpan: string = '';

  constructor(
    private ticketService: TicketService,
    private store: Store<Reducer.StateDataStore>,
  ) {
    super();
   }

  ngOnInit() {
    this.loadTicket();
  }
  // pour le reset des

  onPageChange(page: string): void {
    this.page = page;
    // console.log('Page changed to:', this.page);
  }

  loadTicket() {
    this.store.select(Reducer.getTicket).pipe(takeUntil(this.destroy$)).subscribe((ticket: Ticket)=>{
      this.ticket = ticket;
    });
      if (this.ticket) {
        // console.log('ticket details:', this.ticket);
      this.checkStatus();
      this.checkPriority();
    }
  }


  checkStatus() {
    if (this.ticket.status.statusTitle === 'À faire') {
      this.statutSpan = 'todo';

    } if (this.ticket.status.statusTitle === 'En cours') {
      this.statutSpan = 'done';
    }
    if (this.ticket.status.statusTitle === 'Terminé') {
      this.statutSpan = 'done';
      this.canClose = true;
    }
  }

  checkPriority() {
    if (this.ticket.priority.priorityTitle === 'Basse') {
      this.prioritySpan = 'low';
    }
    if (this.ticket.priority.priorityTitle === 'Moyenne') {
      this.prioritySpan = 'medium';
    }
    if (this.ticket.priority.priorityTitle === 'Élevée') {
      this.prioritySpan = 'high';
    }
  }


  archiveTicket(ticketId: number): void {
    if (!this.ticket.archiveDate) {
      // Make sure to create a copy of the ticket object to avoid modifying the original object
      const payload: Partial<Ticket> = {
        ...this.ticket,
        archiveDate: new Date().toISOString(),
      };
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }
  
  
  unarchiveTicket(ticketId: number): void {
    if (!!this.ticket.archiveDate) {
      let payload: Partial<Ticket> = {
        id: ticketId,
        archiveDate: '',
      }
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }

  closeTicket() {
  }

  reopenTicket() {
  }


}
