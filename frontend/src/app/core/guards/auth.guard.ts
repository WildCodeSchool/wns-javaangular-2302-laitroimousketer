import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      this.authService.logout(); // Token absent, déconnecter l'utilisateur
      return false;
    }
    return true; // Utilisateur authentifié, autoriser l'accès à la route
  }
}
