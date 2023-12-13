import { Component, Input, OnInit } from '@angular/core';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RenamingService } from 'src/app/core/services/renaming.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { Observable, takeUntil } from 'rxjs';
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
    private renamingService: RenamingService,
    private alertService: AlertService,
    private store: Store<Reducer.StateDataStore>,
  ) {
    super();
   }

  ngOnInit() {
    this.loadTicket();
    console.log('ticket details:', this.ticket)
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
        console.log('ticket details:', this.ticket);

      this.ticket.id = this.ticket.id ? this.ticket.id : 0;
      this.ticket.ticketTitle = this.ticket.ticketTitle ? this.ticket.ticketTitle : '';
      this.ticket.description = this.ticket.description ? this.ticket.description : '';
      this.ticket.priorityTitle = this.ticket.priorityTitle ? this.ticket.priorityTitle : '';
      this.ticket.categoryTitle = this.ticket.categoryTitle ? this.ticket.categoryTitle : '';
      this.ticket.creationDate = this.ticket.creationDate ? this.ticket.creationDate : '';
      this.ticket.updateDate = this.ticket.updateDate ? this.ticket.updateDate : '';
      this.ticket.archiveDate = this.ticket.archiveDate ? this.ticket.archiveDate : '';
      this.ticket.statusTitle = this.ticket.statusTitle ? this.ticket.statusTitle : '';
      this.ticket.authorId = this.ticket.authorId ? this.ticket.authorId : 0;
      this.ticket.authorFirstname = this.ticket.authorFirstname ? this.ticket.authorFirstname : '';
      this.ticket.authorLastname = this.ticket.authorLastname ? this.ticket.authorLastname : '';
      this.fullnameAuthor = this.ticket.authorLastname + ' ' + this.ticket.authorFirstname || '';
      this.ticket.authorEmail = this.ticket.authorEmail ? this.ticket.authorEmail : '';
      this.ticket.ticketHaveUsers = this.ticket.ticketHaveUsers ? this.ticket.ticketHaveUsers : [];
      this.checkStatus();
      this.checkPriority();
      this.rename();
    }
  }


  checkStatus() {
    if (this.ticket.statusTitle === 'TO_DO') {
      this.statutSpan = 'todo';

    } if (this.ticket.statusTitle === 'DOING') {
      this.statutSpan = 'done';
    }
    if (this.ticket.statusTitle === 'DONE') {
      this.statutSpan = 'done';
      this.canClose = true;
    }
  }

  checkPriority() {
    if (this.ticket.priorityTitle === 'LOW') {
      this.prioritySpan = 'low';
    }
    if (this.ticket.priorityTitle === 'MEDIUM') {
      this.prioritySpan = 'medium';
    }
    if (this.ticket.priorityTitle === 'HIGH') {
      this.prioritySpan = 'high';
    }
  }
  rename() {
    this.ticket.categoryTitle = this.renamingService.renameCategory(this.ticket.categoryTitle);
    this.ticket.statusTitle = this.renamingService.renameStatus(this.ticket.statusTitle);
    this.ticket.priorityTitle = this.renamingService.renamePriority(this.ticket.priorityTitle);
  }

  archiveTicket(ticketId: number): void {
    if (this.ticket.archiveDate === '') {
      this.ticketService.archiveTicket(ticketId)
    }
  }

  unarchiveTicket(ticketId: number): void {
    if (this.ticket.archiveDate !== '') {
      this.ticketService.unarchiveTicket(ticketId)
    }
  }

  closeTicket() {
  }

  reopenTicket() {
  }


}
