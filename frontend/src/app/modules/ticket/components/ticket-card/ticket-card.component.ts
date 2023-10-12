import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { TicketDetails } from '../../models/ticket-details';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
  ticketDetails: TicketDetails = {
    number: 0,
    name: '',
    userFirstName: '',
    userLastName: '',
    description: '',
    priority: '',
    creationDate: '',
    updateDate: '',
    status: '',
    fullnameAuthor: '',
    developers: [],
    authorId: 0,
    authorEmail: '',
    authorFirstname: '',
    authorLastname: '',
  };

  @Input() ticket!: Ticket;

  colorPriority : string = '';
  colorStatus : string = '';
  constructor(
    private sharedService: SharedService,
    ) {}

  ngOnInit() {
    this.loadTicket();
    this.loadColorPriority();
    this.loadColorStatus();
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
      this.ticketDetails.status = this.ticket.statusTitle || '';
      this.ticketDetails.authorId = this.ticket.authorId || 0;
      this.ticketDetails.authorEmail = this.ticket.authorEmail || '';
      this.ticketDetails.authorFirstname = this.ticket.authorFirstname || '';
      this.ticketDetails.authorLastname = this.ticket.authorLastname || '';
      this.ticketDetails.fullnameAuthor = this.ticket.authorFirstname + ' ' + this.ticket.authorLastname || '';
    
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
}
