import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  openMenu() {
    this.trigger.openMenu();
  }
  private sidebarSubscription: Subscription | undefined;
  
  logo: string = 'assets/images/Alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  userRole: string = ''; // Ajoute cette ligne pour déclarer la propriété userRole
  userEmail: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  opened: boolean = false;

  constructor(
    private store: Store<Reducer.StateDataStore>,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Appelle getUserProfile() pour récupérer les données de l'utilisateur
    this.sidebarSubscription = this.sharedService.sidebarOpened$.subscribe(opened => {
      this.opened = opened;
    });
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

  openSidebar() {
    this.sharedService.toggleSidebar();

   
  }
}
