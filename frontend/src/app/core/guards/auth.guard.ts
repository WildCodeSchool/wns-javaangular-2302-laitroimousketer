import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    const authToken = this.authService.getAuthToken();

    if (!authToken || !this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
      console.log("token expiré");
      // Utilisateur non authentifié ou pas de token, rediriger vers la page de connexion
      window.location.href = '/auth'; // Rafraîchit la page en changeant l'URL
      return false; // Vous pouvez également renvoyer false pour indiquer que la navigation n'est pas autorisée
    }
    
    return true; // L'utilisateur est authentifié, autoriser l'accès à la route
  }
}
