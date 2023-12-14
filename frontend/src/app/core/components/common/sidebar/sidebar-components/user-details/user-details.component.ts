import { getUser } from './../../../../../../store/reducers/index';
import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/features/ticket/models/ticket';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
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
export class UserDetailsComponent extends UnsubcribeComponent implements OnInit {
  menuItems: MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill' },
    { page: 'Actions', icon: 'bi bi-pencil-square' }
  ];
  page: string = 'Info';
  menuTitle: string = 'Utilisateur';
  menuIcon: string = 'bi bi-person-fill';
  user!: User;
  role: string = ''
  fullname: string = '';
  userTickets: Ticket[] = [];
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
  ) { super(); }

  ngOnInit() {
    this.loadUser();
    if (this.user.roleTitle === 'CLIENT') {
      // Si le rôle est CLIENT, pas de menu
      this.menuItems = []
    }
    this.loadUserTickets();
  }

  loadUser() {
    this.store.select(Reducer.getUser).pipe(takeUntil(this.destroy$)).subscribe((user: User) => {
      this.user = user;
      console.log(user, 'user from user details');
      if (this.user.firstname && this.user.lastname) {
        this.fullname = user.firstname + ' ' + user.lastname;
      }
    });

  }

  onPageChange(page: string): void {
    this.page = page;
    // console.log('Page changed to:', this.page);
  }
  loadUserTickets() {
    this.ticketService.getTicketsByFilters(this.user.id).pipe(takeUntil(this.destroy$)).subscribe((tickets: Ticket[]) => {
      this.userTickets = tickets;
      console.log(this.userTickets, 'user tickets from user details');
    });
  }

}
