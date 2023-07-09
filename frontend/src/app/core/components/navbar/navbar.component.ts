import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  logo: string = 'assets/images/alayde.png';
  ticket: string = 'assets/images/tickets.png';
  avatar: string = 'assets/images/avatar.png';
  userRole: string = ''; // Ajoute cette ligne pour déclarer la propriété userRole

  constructor(private userService: UserService, private authService: AuthService,private sharedService: SharedService){ 
    this.getUserProfile();
  }

  getUserProfile(): void {
    const userEmail = this.authService.getUserMailFromToken(this.authService.getAuthToken());
  
    if (userEmail) {
      this.userService.getUserByEmail(userEmail).subscribe(
        (user: User) => {
          if (user.role && user.role.id != null) {
            this.userRole = user.role.id.toString();
            console.log('ID de l\'utilisateur :', user.id, user);
            console.log('Rôle de l\'utilisateur :', this.userRole, user);
          } else {
            console.error('Erreur lors de la récupération du rôle de l\'utilisateur : role_id non défini', user);
          }
          
        },
        (error: any) => {
          console.error('Erreur lors de la récupération du profil utilisateur :', error);
        }
      );
    } else {
      console.error('Adresse e-mail de l\'utilisateur non valide');
    }
  }
  
  
  openSidebar() {
    this.sharedService.toggleSidebar();
  }
  
  
test() {
  this.getUserProfile();
}
 
}
