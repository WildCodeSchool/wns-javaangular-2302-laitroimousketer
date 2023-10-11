import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../../../modules/ticket/models/ticket';
import { TicketDetails } from 'src/app/modules/ticket/models/ticket-details';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  animations: [
    trigger('opacity', [
      transition('void => active', [
        style({ opacity: '0' }),
        animate('0.7s', style({ opacity: '1' }))
      ]),
      transition('* => void', [
        animate(70, style({ opacity: '0' }))
      ])
    ])
  ]
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

  menuItems : MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill'},
    { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
    { page: 'Actions', icon: 'bi bi-pencil-square'}
  ];
  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-ticket-fill';

  page: string = 'Info';

  statutSpan: string = '';
  prioritySpan: string = '';
  constructor() { }

  ngOnInit() {
    this.loadTicket();
  }
onPageChange(page: string): void {
  this.page = page;
  console.log('Page changed to:', this.page);
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
      
      //check les dev assignés au ticket
      if (this.ticket.userHasTickets !== undefined) {
        this.ticket.userHasTickets.forEach((user) => {
          if (!user.creator) {
            console.log('User is not creator:', user);
            const developerName = `${user.userLastName} ${user.userFirstName} `;
            this.ticketDetails.developers.push(developerName);
          }
        });
    
      const creatorUser = this.ticket.userHasTickets?.find(
        (user) => user.creator
      );
      //check le créateur du ticket
      if (creatorUser) {
        console.log('User is creator:', creatorUser);
        this.ticketDetails.creator = `${creatorUser.userLastName} ${creatorUser.userFirstName}`;
        this.ticketDetails.userFirstName = creatorUser.userFirstName;
        this.ticketDetails.userLastName = creatorUser.userLastName;
      }
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
