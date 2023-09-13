import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

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

  logo: string = 'assets/images/alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  userRole: string = ''; // Ajoute cette ligne pour déclarer la propriété userRole
  userEmail: string = '';
  userFirstName: string = '';
  userLastName: string = '';

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Appelle getUserProfile() pour récupérer les données de l'utilisateur
    this.authService.getUserProfile().subscribe((user) => {
      this.userEmail = this.authService.userEmail;
      this.userFirstName = this.authService.userFirstName;
      this.userLastName = this.authService.userLastName;
      this.userRole = this.authService.userRole;
      console.log('Infos utilisateur from navbar component :','mail:', this.userEmail,'firstName:', this.userFirstName,'lastName:', this.userLastName,'Role:', this.userRole);
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  openSidebar() {
    this.sharedService.toggleSidebar();
  }
}
