import { Component, Input, OnInit } from '@angular/core';

import { SharedService } from 'src/app/core/services/shared.service';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { TicketDetails } from 'src/app/features/ticket/models/ticket-details';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { TicketService } from 'src/app/core/services/ticket.service';
@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent extends UnsubcribeComponent implements OnInit {
  ticketDetails: TicketDetails = {
    number: 0,
    name: '',
    userFirstName: '',
    userLastName: '',
    description: '',
    priority: '',
    creationDate: '',
    updateDate: '',
    archiveDate: '',
    status: '',
    fullnameAuthor: '',
    developers: [],
    authorId: 0,
    authorEmail: '',
    authorFirstname: '',
    authorLastname: '',
    category: '',
  };

  @Input() ticket!: Ticket;

  oldTicket: string = '';
  colorPriority: string = '';
  colorStatus: string = '';
  isArchive: boolean = false;
  constructor(
    private sharedService: SharedService,
    private ticketService: TicketService,
    private store: Store<Reducer.StateDataStore>,
  ) {
    super();
  }

  ngOnInit() {
    this.loadTicket();
    this.loadColorPriority();
    this.loadColorStatus();
    // this.oldTicket = JSON.stringify(this.ticket);
    // console.log(this.ticketDetails.creator,'CCCCCCCCCCCCCCCCCCCCCCCC')
  }

  loadTicket() {
    if (this.ticket !== undefined) {
      // console.log(this.ticket);
      this.ticketDetails.number = this.ticket.id;
      this.ticketDetails.name = this.ticket.ticketTitle || '';
      this.ticketDetails.description = this.ticket.description || '';
      this.ticketDetails.priority = this.ticket.priority.priorityTitle || '';
      this.ticketDetails.creationDate = this.ticket.creationDate || '';
      this.ticketDetails.updateDate = this.ticket.updateDate || '';
      this.ticketDetails.archiveDate = this.ticket.archiveDate || '';
      this.ticketDetails.status = this.ticket.status.statusTitle || '';
      this.ticketDetails.category = this.ticket.category.categoryTitle || '';
      this.ticketDetails.authorId = this.ticket.author.id || 0;
      this.ticketDetails.authorEmail = this.ticket.author.email || '';
      this.ticketDetails.authorFirstname = this.ticket.author.firstname || '';
      this.ticketDetails.authorLastname = this.ticket.author.lastname || '';
      this.ticketDetails.fullnameAuthor = this.ticket.author.firstname + ' ' + this.ticket.author.lastname || '';
      if (this.ticket.archiveDate !== null) {
        this.isArchive = true;
      }
    }

  }

  loadColorPriority() {
    if (this.ticketDetails.priority === 'Basse') {
      this.colorPriority = 'green';
    } else if (this.ticketDetails.priority === 'Moyenne') {
      this.colorPriority = 'yellow';
    } else if (this.ticketDetails.priority === 'Élevée') {
      this.colorPriority = 'red';
    } else {
      this.colorPriority = ''; // Aucune classe par défaut si la priorité n'est pas définie
    }
  }
  loadColorStatus() {
    if (this.ticketDetails.status === 'À faire') {
      this.colorStatus = 'red';

    } if (this.ticketDetails.status === 'En cours') {
      this.colorStatus = 'yellow';
    }
    if (this.ticketDetails.status === 'Terminé') {
      this.colorStatus = 'green';
    }

  }

  openTicketDetails() {
    this.store.dispatch(ticketAction.getTicket({ payload: this.ticket.id, displayInSidebar: true }));
  }


}
