import { getUser } from '../../../../store/reducers/index';
import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../layout/sidebar/sidebar-menu/menu-items.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { animate, group, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/core/models/user.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Ticket } from 'src/app/core/models/ticket.model';
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
export class UserDetailsComponent extends UnsubcribeComponent implements OnInit {
  menuItems: MenuItems[] = [
    { page: 'Info', icon: 'bi bi-info-square-fill' },
    { page: 'Tickets', icon: 'bi bi-tag-fill'},
    { page: 'Historical-User', icon: 'bi bi-clock-history'},
    { page: 'Actions', icon: 'bi bi-gear-fill' },
  ];
  page: string = 'Info';
  menuTitle: string = 'Utilisateur';
  menuIcon: string = 'bi bi-person-fill';
  user!: User;
  userConnected!: User;
  role: string = '';
  roleUserConnected: string = '';
  fullname: string = '';
  userTickets: Ticket[] = [];
  showMore: boolean = false;
  pages: string[] = ['Info', 'Tickets', 'Actions'];
  labelShowMore: string = '';
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
  ) { super(); }


  ngOnInit() {
    this.loadUserConnected();
    this.loadUser();
    if (this.roleUserConnected === 'Client') {
      // Si le rôle est CLIENT, pas de menu
      this.menuItems = []
    }
    this.loadUserTickets();
  }

loadUserConnected() {
    this.store.select(Reducer.getUserConnected).pipe(takeUntil(this.destroy$)).subscribe((data: User) => {
      this.userConnected = data;
      this.roleUserConnected = data.role!.roleTitle;
    });
}
  loadUser() {
    this.store.select(Reducer.getUser).pipe(takeUntil(this.destroy$)).subscribe((user: User) => {
      this.user = user;
      // console.log(user, 'user from user details');
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
    let query = 'userId='+this.user.id;
    this.ticketService.getTicketsByFilters(query).pipe(takeUntil(this.destroy$)).subscribe((tickets: Ticket[]) => {
      this.userTickets = tickets;
      // console.log(this.userTickets, 'user tickets from user details');
    });
  }
  sendMail() {
    window.open('mailto:' + this.user.email);
  }

  updateUser(userId: number) {
    const updatedUser: Partial<User> = {
      id: userId,
      firstname: 'newFirstName' + userId,
      lastname: 'newLastName' + userId,
    };
    this.store.dispatch(userAction.updateUser({ payload: updatedUser }));
  }
  deleteUser(userId: number) {
    this.store.dispatch(userAction.deleteUser({ payload: userId }));
  }
  onShowMore() {
    this.showMore = !this.showMore;
    this.labelShowMore = this.showMore ? 'Voir moins' : 'Voir le détail';
  }
}
