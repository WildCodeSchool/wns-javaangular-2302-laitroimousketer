import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  private registerSubscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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

      this.registerSubscription = this.authService.register(firstName, lastName, email, password)
        .subscribe(
          () => {
            console.log('Enregistrement réussi !');
            // Effectuer les actions supplémentaires après l'enregistrement réussi, si nécessaire
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement :', error);
            // Gérer l'erreur d'enregistrement, si nécessaire
          }
        );
    }
  }

  ngOnDestroy(): void {
    // Se désabonner des abonnements ici
    this.registerSubscription.unsubscribe();
  }
}
  

