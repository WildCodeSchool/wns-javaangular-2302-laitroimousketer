import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // register() {
  //   this.authService.register(this.email, this.password, this.firstName + ' ' + this.lastName)
  //     .subscribe(
  //       (response) => {
  //         this.router.navigate(['/tickets/list']);
  //       },
  //       (error) => {
  //         // Traitement en cas d'erreur de l'enregistrement
  //         // Affichage d'un message d'erreur, gestion des erreurs, etc.
  //       }
  //     );
  // }
}
