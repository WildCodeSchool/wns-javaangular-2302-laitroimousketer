import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
 
  registerForm: FormGroup = new FormGroup({});

  private subscriptionRegister: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[\p{L}\s'-]+$/u)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[\p{L}\s'-]+$/u)]],      
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
      confirmPassword: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const firstName = this.registerForm.get('firstName')?.value;
      const lastName = this.registerForm.get('lastName')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return;
      }

      this.subscriptionRegister= this.authService.register(firstName, lastName, email, password)
        .subscribe({
          next: () => {
            this.switchToLogin();
            // Effectuer les actions supplémentaires après l'enregistrement réussi, si nécessaire
            this.alertService.showSuccessAlert('Votre compte a été créé avec succès !');
          },
          error: (error: any) => {
            console.error('Erreur lors de l\'enregistrement :', error);
            this.alertService.showErrorAlert('Erreur lors de l\'enregistrement !');
            // Gérer l'erreur d'enregistrement, si nécessaire
          }
    });
    }
  }

  ngOnDestroy(): void {
    // Se désabonner des abonnements ici
    this.subscriptionRegister.unsubscribe();
  }



  switchToLogin(): void {
    this.authService.switchToLogin();
  }
  
}
  

