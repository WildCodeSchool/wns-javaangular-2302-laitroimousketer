import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import {MatFormFieldModule} from '@angular/material/form-field';  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  
  loginForm: FormGroup = new FormGroup({});
  private subscriptionLogin: Subscription = new Subscription();
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService

  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
          ),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
  
      this.subscriptionLogin = this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/tickets/list']);
          this.alertService.showSuccessAlert('Vous êtes connecté !');
        },
        error: (error: any) => {
          console.error('Login error:', error);
          this.alertService.showErrorAlert('Erreur lors de la connexion !');
        }
      });
    }
  }
  
  

  logout(): void {
    this.alertService.showSuccessAlert('Vous êtes déconnecté !');
    this.authService.logout();
  }
  ngOnDestroy(): void {
    // Désabonnez-vous des abonnements ici
    this.subscriptionLogin.unsubscribe();
  }

  switchToRegister(): void {
    this.authService.switchToRegister();
  }

}
