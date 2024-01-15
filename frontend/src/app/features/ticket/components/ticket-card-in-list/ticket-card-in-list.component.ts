import { Component, Input, OnInit } from '@angular/core';

import { Ticket } from 'src/app/core/models/ticket.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';

@Component({
  selector: 'app-ticket-card-in-list',
  templateUrl: './ticket-card-in-list.component.html',
  styleUrls: ['./ticket-card-in-list.component.scss'],
})
export class TicketCardInListComponent extends UnsubcribeComponent implements OnInit {

  @Input() ticket!: Ticket;

  oldTicket: string = '';
  colorPriority: string = '';
  colorStatus: string = '';
  isArchive: boolean = false;
  fullnameAuthor:  string = '';
  constructor(
    private store: Store<Reducer.StateDataStore>,
  ) {
    super();
  }

  ngOnInit() {
    this.loadTicket();
    this.loadColorPriority();
    this.loadColorStatus();
  }

  loadTicket() {
    if (this.ticket !== undefined) {
      // console.log(this.ticket);
      this.fullnameAuthor = this.ticket.author?.firstname + ' ' + this.ticket.author?.lastname || '';
      if (this.ticket.archiveDate !== null) {
        this.isArchive = true;
      }
    }

  }

  loadColorPriority() {

    if (this.ticket.priority?.priorityTitle === 'Basse') {
      this.colorPriority = 'green';
    } else if (this.ticket.priority?.priorityTitle === 'Moyenne') {
      this.colorPriority = 'yellow';
    } else if (this.ticket.priority?.priorityTitle === 'Élevée') {
      this.colorPriority = 'red';
    } else {
      this.colorPriority = ''; // Aucune classe par défaut si la priorité n'est pas définie
    }
  }
  loadColorStatus() {
    if (this.ticket.status?.statusTitle === 'À faire') {
      this.colorStatus = 'red';

    } if (this.ticket.status?.statusTitle === 'En cours') {
      this.colorStatus = 'yellow';
    }
    if (this.ticket.status?.statusTitle === 'Terminé') {
      this.colorStatus = 'green';
    }
  }

  openTicketDetails() {
    this.store.dispatch(ticketAction.getTicket({ payload: this.ticket.id, displayInSidebar: true }));
  }


}
