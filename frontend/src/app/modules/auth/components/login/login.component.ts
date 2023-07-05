import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service'; // Import the AuthService
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

    login() {
      this.authService.login(this.email, this.password).subscribe(
        () => {
          this.router.navigate(['/tickets/list']);
          console.log('login',this.email, this.password);
        },
        (error) => {
          this.errorMessage = 'Identifiants de connexion invalides.';
          console.log('Erreur de connexion :', error);
        }
      );
    }
    logout() {
      this.authService.logout();
    }

}
