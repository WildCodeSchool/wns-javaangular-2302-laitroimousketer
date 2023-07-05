import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  private apiUrl = environment.apiUrl;

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      if (this.authService.$isLog.getValue() === false) {
        // Utilisateur déjà déconnecté, pas besoin d'appeler logout()
        return false;
      } else {
        this.authService.logout(); // Token absent et encore connecté, déconnecter l'utilisateur
        this.router.navigate([`${this.apiUrl}/auth/login`]); // puis redirige vers la page de login
        return false;
      }
    }
    return true; // Utilisateur authentifié, autoriser l'accès à la route
  }
}
