import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import * as userAction from 'src/app/store/actions/user.action';
import { User } from 'src/app/core/models/user.model';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends UnsubcribeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  openMenu() {
    this.trigger.openMenu();
  }
  private sidebarSubscription: Subscription | undefined;

  logo: string = 'assets/images/Alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  userRole: string = '';
  userEmail: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  opened: boolean = false;

  user?: User
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    super();
    this.loadUserConnected();
   }

  ngOnInit(): void {
    // Appelle getUserProfile() pour récupérer les données de l'utilisateur
    this.authService.getUserProfile().subscribe((user) => {
      this.userEmail = this.authService.userEmail;
      this.userFirstName = this.authService.userFirstname;
      this.userLastName = this.authService.userLastname;
      this.userRole = this.authService.userRole;
      // console.log('Infos utilisateur from navbar component :','mail:', this.userEmail,'firstName:', this.userFirstName,'lastName:', this.userLastName,'Role:', this.userRole);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  toggleSidebarActivity(): void {
    this.store.dispatch(sidebarAction.displayActivity());
  }

  toggleSidebarNewTicket(): void {
    this.store.dispatch(sidebarAction.displayTicketCreate());
  }
  
  toggleSidebarUserProfil(): void {
    this.store.dispatch(sidebarAction.displayUserProfil());
  }
  loadUserConnected() {
    if (this.user) {
      return;
    }
    this.store.select(Reducer.getUserConnected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: User) => {
        console.log('user from store',data);

  } );
}


}