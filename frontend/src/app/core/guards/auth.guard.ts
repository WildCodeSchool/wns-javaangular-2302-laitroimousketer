import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    const authToken = this.authService.getAuthToken();
    if (!authToken) {
      // Utilisateur non authentifié ou pas de token, rediriger vers la page de connexion
      return this.router.parseUrl('/auth'); // Redirection vers la page de connexion
    }
    return true; // L'utilisateur est authentifié, autoriser l'accès à la route
  }
}
