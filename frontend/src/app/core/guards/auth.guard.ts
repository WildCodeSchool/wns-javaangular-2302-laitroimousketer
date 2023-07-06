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
      if (this.authService.$isLog.getValue() === false) {
        // Utilisateur déjà déconnecté, pas besoin d'appeler logout()
        this.router.navigate(['/auth']); // Rediriger vers la page de connexion
        return false;
      } else {
        this.authService.logout(); // Token absent et encore connecté, déconnecter l'utilisateur
        this.router.navigate(['/auth']); // Rediriger vers la page de connexion
        return false;
      }
    }
    return true; // Utilisateur authentifié, autoriser l'accès à la route
  }
}
