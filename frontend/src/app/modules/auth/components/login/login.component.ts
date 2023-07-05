import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalLogoutComponent } from 'src/app/core/components/modals/modal-logout/modal-logout.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  private subscriptionLogin: Subscription = new Subscription();
  private modalRef?: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
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
        },
        error: (error: any) => {
          this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
          console.error('Login error:', error);
        }
      });
    }
  }
  
  

  logout(): void {
    this.authService.logout();
    this.showLogoutPopup();    
  }
  ngOnDestroy(): void {
    // Désabonnez-vous des abonnements ici
    this.subscriptionLogin.unsubscribe();
  }
  showLogoutPopup(): void {
    this.modalRef = this.modalService.show(ModalLogoutComponent);
  }
}
