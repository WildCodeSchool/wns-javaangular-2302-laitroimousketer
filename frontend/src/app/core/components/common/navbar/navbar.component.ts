import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  private sidebarSubscription: Subscription | undefined;

  logo: string = 'assets/images/Alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  opened: boolean = false;

  userConnected!: User
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    super();
   }

  ngOnInit(): void {
    // Appelle getUserProfile() pour récupérer les données de l'utilisateur
    this.loadUserConnected();
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

  openMenu() {
    this.trigger.openMenu();
  }

  loadUserConnected() {
    if (!this.userConnected) {
      this.store.select(Reducer.getUserConnected)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user: User) => {
            this.userConnected = user;
            // console.log('userConnected:', this.userConnected);
          },
          error: (error: any) => {
            console.error('Erreur lors de la récupération du profil utilisateur :', error);
          }
        });
    }
  }
  
  
}


