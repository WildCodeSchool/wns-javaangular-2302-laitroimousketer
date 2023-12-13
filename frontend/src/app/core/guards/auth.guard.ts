import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    const authToken = this.authService.getAuthToken();
    // console.log('authToken', authToken);
    this.authService.checkTokenExpiration();
    if (!authToken || this.authService.isTokenExpired()) {
      // Utilisateur non authentifié ou pas de token, rediriger vers la page de connexion
      return this.router.createUrlTree(['/auth']); // Utilisez createUrlTree pour créer une URL Tree
    }
    return true; // L'utilisateur est authentifié, autoriser l'accès à la route
  }
}
