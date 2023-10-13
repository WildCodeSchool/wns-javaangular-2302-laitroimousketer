import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../../../modules/ticket/models/ticket';
import { TicketDetails } from 'src/app/modules/ticket/models/ticket-details';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket!: Ticket | null;

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
    creator: '',
    developers: [],
  };

  statutSpan: string = '';
  prioritySpan: string = '';
  constructor() { }

  ngOnInit() {
    this.loadTicket();
  }

  loadTicket() {
    if (this.ticket !== undefined && this.ticket !== null) {
      console.log('ticket details:', this.ticket);
    
      this.ticketDetails.number = this.ticket.id ? this.ticket.id : 0;
      this.ticketDetails.name = this.ticket.ticketTitle ? this.ticket.ticketTitle : '';
      this.ticketDetails.description = this.ticket.description ? this.ticket.description : '';
      this.ticketDetails.priority = this.ticket.priorityTitle ? this.ticket.priorityTitle : '';
      this.ticketDetails.creationDate = this.ticket.creationDate ? this.ticket.creationDate : '';
      this.ticketDetails.updateDate = this.ticket.updateDate ? this.ticket.updateDate : '';
      this.ticketDetails.status = this.ticket.statusTitle ? this.ticket.statusTitle : '';
      this.checkStatusColorSpan();
      this.checkPriorityColorSpan();
      const creatorUser = this.ticket.userHasTickets?.find(
        (user) => user.creator
      );
      if (creatorUser) {
        console.log('User is creator:', creatorUser);
        this.ticketDetails.creator = `${creatorUser.userLastName} ${creatorUser.userFirstName}`;
        this.ticketDetails.userFirstName = creatorUser.userFirstName;
        this.ticketDetails.userLastName = creatorUser.userLastName;
      }
      if (this.ticket.userHasTickets !== undefined) {
        this.ticket.userHasTickets.forEach((user) => {
          if (!user.creator) {
            console.log('User is not creator:', user);
            const developerName = `${user.userLastName} ${user.userFirstName} `;
            this.ticketDetails.developers.push(developerName);
          }
        });
      }
    }
  }

  checkStatusColorSpan(){
    if (this.ticketDetails.status === 'TO_DO') {
      this.statutSpan = 'todo';
  
    } if (this.ticketDetails.status === 'DOING') {
      this.statutSpan = 'done';
    }
    if (this.ticketDetails.status === 'DONE') {
      this.statutSpan = 'done';
    }
  }
  
  checkPriorityColorSpan(){
    if (this.ticketDetails.priority === 'LOW') {
      this.prioritySpan = 'low';
    }
    if (this.ticketDetails.priority === 'MEDIUM') {
      this.prioritySpan = 'medium';
    }
    if (this.ticketDetails.priority === 'HIGH') {
      this.prioritySpan = 'high';
    }
  }

}
