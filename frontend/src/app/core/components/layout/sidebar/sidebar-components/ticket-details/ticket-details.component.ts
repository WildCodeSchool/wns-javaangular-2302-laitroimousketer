import { Component, Input, OnInit } from '@angular/core';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/core/models/ticket.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import * as userAction from 'src/app/store/actions/user.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { Observable, map, startWith, takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';

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
    ]),
    trigger('expandCollapse', [
      transition('void => *', [
        style({ height: '0', overflow: 'hidden', opacity: '0' }),
        group([
          animate('250ms ease-out', style({ height: '*' })),
          animate('250ms ease-out', style({ opacity: '1' })),
        ]),
      ]),
      transition('* => void', [
        style({ height: '*', overflow: 'visible', opacity: '1' }),
        group([
          animate('250ms ease-out', style({ height: '0' })),
          animate('250ms ease-out', style({ opacity: '0' })),
        ]),
      ]),
    ]),
  ],
})
export class TicketDetailsComponent extends UnsubcribeComponent implements OnInit {

  ticket?: Ticket;
  menuItems: MenuItems[] = [];
  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-tag-fill';
  page: string = 'Info';
  statutSpan: string = '';
  prioritySpan: string = '';

  userConnected!: User;
  author!: User;

  userCanChat: boolean = false;
  // id of the userTicket that match with the ticket_id opened here
  userTicketIdMatch: number = 0;
  isAddingDeveloper: boolean = false;
  filteredDevelopers?: Observable<User[]>;
  developersForm!: FormGroup;
  allDevelopers: User[] = [];
  constructor(
    private ticketService: TicketService,
    private userService: UserService,
    private store: Store<Reducer.StateDataStore>,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadTicket();
    this.loadUserConnected();
    this.loadDevelopers();
    this.loadDevelopersForm();
    this.checkIfUserCanChat();
    this.initMenuItems();
  }


loadDevelopersForm() {
  this.developersForm = this.fb.group({
    developers: ['']
  })
}
saveFollowUp() {
  const selectedDeveloper = this.developersForm.get('developers')?.value;
  
  if (selectedDeveloper) {
    // Cloner le ticket existant
    let updatedTicket: Partial<Ticket> = {
      ...this.ticket,
      developers: [...this.ticket!.developers, selectedDeveloper] // Ajouter le développeur au tableau
    };

    this.ticketService.update(updatedTicket).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.isAddingDeveloper = false;
      this.ticket = updatedTicket as Ticket;
      this.alertService.showSuccessAlert(`Développeur assigné au ticket numéro ${this.ticket.id} avec succès`);
      this.checkIfUserCanChat();// Vérifier si l'utilisateur peut chatter après l'ajout du développeur
    });
  }
}
cancelFollowUp() {
  this.developersForm.reset();
  this.isAddingDeveloper = false;
}
deleteFollowUp(developer: User) {
  let updatedTicket: Partial<Ticket>= {
    ...this.ticket,
    developers: this.ticket?.developers.filter(dev => dev.id !== developer.id)
  };
  this.ticketService.update(updatedTicket).pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.ticket = updatedTicket as Ticket;
  })
}

  loadUserConnected() {
    this.store.select(Reducer.getUserConnected).pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.userConnected = user;
    });
  }

  checkIfUserCanChat() {
    if (this.userConnected.role.roleTitle === 'Client') {
      this.userCanChat = true;
    } else if (this.ticket?.developers?.some((developer) => developer.id === this.userConnected.id)) {
      this.userCanChat = true;
    } else {
      this.userCanChat = false;
    }
  }

  initMenuItems() {

    if (this.userConnected.role.roleTitle !== 'Client') {
      this.menuItems = [
        { page: 'Info', icon: 'bi bi-info-square-fill' },
        { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
        { page: 'Actions', icon: 'bi bi-gear-fill' }
      ]
    } else {
      this.menuItems = [
        { page: 'Info', icon: 'bi bi-info-square-fill' },
        { page: 'Chat', icon: 'bi bi-chat-left-dots-fill' },
      ];
    }
  }
  onAddFollowUp() {
    this.isAddingDeveloper = true;
  }
  onPageChange(page: string): void {
    this.page = page;
    // console.log('Page changed to:', this.page);
  }
  displayUser() {
    this.store.dispatch(userAction.getUser({ payload: this.ticket!.author!.id, displayInSidebar: true }));
  }

  loadTicket() {
    this.store.select(Reducer.getTicket)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ticket: Ticket) => {
        this.ticket = ticket;
        this.author = ticket.author || {} as User;
        if (this.ticket) {
          // console.log('ticket details:', this.ticket);
          this.checkStatus();
          this.checkPriority();
        }
      });
  }

loadDevelopers() {
  this.userService.getUsersByRoleTitle('Développeur').subscribe((developers) => {
    this.allDevelopers = developers;
    // console.log('Developers:', this.allDevelopers);
  })
}

  checkStatus() {
    switch (this.ticket?.status?.statusTitle) {
      case 'À faire':
        this.statutSpan = 'todo';
        break;
      case 'En cours':
      case 'Terminé':
        this.statutSpan = 'done';
        break;
      default:
        break;
    }
  }

  checkPriority() {
    switch (this.ticket?.priority?.priorityTitle) {
      case 'Basse':
        this.prioritySpan = 'low';
        break;
      case 'Moyenne':
        this.prioritySpan = 'medium';
        break;
      case 'Élevée':
        this.prioritySpan = 'high';
        break;
      default:
        break;
    }
  }



  archiveTicket(ticketId: number): void {
    if (!this.ticket?.archiveDate) {
      // Make sure to create a copy of the ticket object to avoid modifying the original object
      const payload: Partial<Ticket> = {
        ...this.ticket,
        archiveDate: new Date().toISOString(),
      };
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }


  unarchiveTicket(ticketId: number): void {
    if (!!this.ticket?.archiveDate) {
      let payload: Partial<Ticket> = {
        id: ticketId,
        archiveDate: null,
      }
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }

  deleteTicket(ticketId: number): void {
    this.store.dispatch(ticketAction.deleteTicket({ payload: ticketId }));
    this.store.dispatch(ticketAction.getTickets());
    this.store.dispatch(sidebarAction.resetSideBar());

  }

  closeTicket() {
    if (this.ticket?.status?.statusTitle !== 'Terminé') {
      let payload: Partial<Ticket> = {
        id: this.ticket!.id,
        status: {
          id: 3
        }
      }
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }

  reopenTicket() {
    if (this.ticket?.status?.statusTitle === 'Terminé') {
      let payload: Partial<Ticket> = {
        id: this.ticket!.id,
        status: {
          id: 1
        }
      }
      this.store.dispatch(ticketAction.updateTicket({ payload }));
    }
  }


}
