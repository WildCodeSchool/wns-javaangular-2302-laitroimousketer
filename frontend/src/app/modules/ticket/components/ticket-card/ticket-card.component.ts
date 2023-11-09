import { Component, Input, OnInit } from '@angular/core';
import { RenamingService } from 'src/app/core/services/renaming.service';

import { SharedService } from 'src/app/core/services/shared.service';
import { Ticket } from 'src/app/modules/ticket/models/ticket';
import { TicketDetails } from 'src/app/modules/ticket/models/ticket-details';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit{
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
    private renamingService: RenamingService,
  ) { }

  ngOnInit() {
    this.loadTicket();
    this.loadColorPriority();
    this.loadColorStatus();
    this.rename();
    this.oldTicket = JSON.stringify(this.ticket);
    // console.log(this.ticketDetails.creator,'CCCCCCCCCCCCCCCCCCCCCCCC')
  }
 
  loadTicket() {
    if (this.ticket !== undefined) {
      // console.log(this.ticket);
      this.ticketDetails.number = this.ticket.id;
      this.ticketDetails.name = this.ticket.ticketTitle || '';
      this.ticketDetails.description = this.ticket.description || '';
      this.ticketDetails.priority = this.ticket.priorityTitle || '';
      this.ticketDetails.creationDate = this.ticket.creationDate || '';
      this.ticketDetails.updateDate = this.ticket.updateDate || '';
      this.ticketDetails.archiveDate = this.ticket.archiveDate || '';
      this.ticketDetails.status = this.ticket.statusTitle || '';
      this.ticketDetails.category = this.ticket.categoryTitle || '';
      this.ticketDetails.authorId = this.ticket.authorId || 0;
      this.ticketDetails.authorEmail = this.ticket.authorEmail || '';
      this.ticketDetails.authorFirstname = this.ticket.authorFirstname || '';
      this.ticketDetails.authorLastname = this.ticket.authorLastname || '';
      this.ticketDetails.fullnameAuthor = this.ticket.authorLastname + ' ' + this.ticket.authorFirstname || '';
      if (this.ticket.archiveDate !== null) {
        this.isArchive = true;
      }
    }

  }

  loadColorPriority() {
    if (this.ticketDetails.priority === 'LOW') {
      this.colorPriority = 'green';
    } else if (this.ticketDetails.priority === 'MEDIUM') {
      this.colorPriority = 'yellow';
    } else if (this.ticketDetails.priority === 'HIGH') {
      this.colorPriority = 'red';
    } else {
      this.colorPriority = ''; // Aucune classe par défaut si la priorité n'est pas définie
    }
  }
  loadColorStatus() {
    if (this.ticketDetails.status === 'TO_DO') {
      this.colorStatus = 'red';

    } if (this.ticketDetails.status === 'DOING') {
      this.colorStatus = 'yellow';
    }
    if (this.ticketDetails.status === 'DONE') {
      this.colorStatus = 'green';
    }

  }

  openSidebar() {
    this.sharedService.toggleSidebar();
    this.sharedService.setCurrentContent('ticket-details');
    this.sharedService.setCurrentTicket(this.ticket);

  }
  rename() {
    this.ticketDetails.category = this.renamingService.renameCategory(this.ticketDetails.category);
    this.ticketDetails.status = this.renamingService.renameStatus(this.ticketDetails.status);
    this.ticketDetails.priority = this.renamingService.renamePriority(this.ticketDetails.priority);
  }


}
