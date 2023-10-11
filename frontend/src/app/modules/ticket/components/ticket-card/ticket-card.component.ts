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
    creator: '',
    developers: [],
  };

  @Input() ticket!: Ticket;

  colorPriority : string = '';

  constructor(
    private sharedService: SharedService,
    ) {}

  ngOnInit() {
    this.loadTicket();
    this.loadColorPriority();
    // console.log(this.ticketDetails.creator,'CCCCCCCCCCCCCCCCCCCCCCCC')
  }


  loadTicket() {
    if (this.ticket !== undefined) {
      console.log(this.ticket);
      this.ticketDetails.number = this.ticket.id;
      this.ticketDetails.name = this.ticket.ticketTitle || '';
      this.ticketDetails.description = this.ticket.description || '';
      this.ticketDetails.priority = this.ticket.priorityTitle || '';
      this.ticketDetails.creationDate = this.ticket.creationDate || '';
      this.ticketDetails.updateDate = this.ticket.updateDate || '';
      this.ticketDetails.status = this.ticket.statusTitle || '';

      if (this.ticket.userHasTickets !== undefined) {
        this.ticket.userHasTickets.forEach((user) => {
          if (!user.creator) {
            console.log('User is not creator:', user);
            const developerName = `${user.userLastName} ${user.userFirstName}`;
            this.ticketDetails.developers.push(developerName);
          }
        });
      }

      const creatorUser = this.ticket.userHasTickets?.find(
        (user) => user.creator
      );
      if (creatorUser) {
        console.log('User is creator:', creatorUser);
        this.ticketDetails.creator = `${creatorUser.userLastName} ${creatorUser.userFirstName}`;
      }
    }
    
  }

  loadColorPriority() {
    if (this.ticketDetails.priority === 'LOW') {
      this.colorPriority = 'low-priority';
    } else if (this.ticketDetails.priority === 'MEDIUM') {
      this.colorPriority = 'medium-priority';
    } else if (this.ticketDetails.priority === 'HIGH') {
      this.colorPriority = 'high-priority';
    } else {
      this.colorPriority = ''; // Aucune classe par défaut si la priorité n'est pas définie
    }
  }
  
  openSidebar() {
    this.sharedService.toggleSidebar();
    this.sharedService.setCurrentContent('ticket-details');
    this.sharedService.setCurrentTicket(this.ticket);
   
  }
}
