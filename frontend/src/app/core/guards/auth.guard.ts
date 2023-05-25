import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private url!: string;

  constructor(private authService: AuthService, private router: Router) {}

  private authState(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(['/tickets/liste']);
      return false;
    }
    return true;
  }

  private notAuthState(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('/login') || this.url.includes('/register')) {
      return true;
    }
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.url = state.url;
    if (this.url == '/') {
      this.router.navigate(['/tickets/list']);
    }
    if (this.authService.isAuthenticated()) {
      return this.authState();
    }
    return this.notAuthState();
  }
}
