import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, take, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Role } from '../models/role.model';
import { AlertService } from './alert.service';

//accessToken est le nom de la propriete du token renvoyée par le serveur
interface LoginResponse {
  accessToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public $isLog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  private activeTabSource: BehaviorSubject<'login' | 'register'> = new BehaviorSubject<'login' | 'register'>('login');
  public activeTab$ = this.activeTabSource.asObservable();

  constructor(private alertService: AlertService, private httpClient: HttpClient, private router: Router, private userService: UserService) {
    const storedToken = this.getAuthToken();
    this.isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthenticated: boolean) => {
        this.$isLog.next(isAuthenticated);
      });
  }

  switchToLogin(): void {
    this.activeTabSource.next('login');
  }

  switchToRegister(): void {
    this.activeTabSource.next('register');
  }
  
  public login(email: string, password: string): Observable<string> {
    return this.httpClient
      .post<LoginResponse>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        map((response: LoginResponse) => {
          this.setAuthToken(response.accessToken);
          this.$isLog.next(true);
          console.log('token reçu',response.accessToken)
          return response.accessToken;
        })
      );
      
  }
  
  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;
  
    const registerData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };
  
    return this.httpClient.post(url, registerData, this.httpOptions)
      .pipe(
        tap(() => {
          // Effectuer les actions nécessaires après l'enregistrement réussi, si nécessaire
          console.log('enregistrement réussi: ', registerData);
          this.alertService.showSuccessAlert('Votre compte a été créé avec succès');
          })
      );
  }
  
  
  public setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public getAuthToken(): string | null {
    const token = localStorage.getItem('auth_token');
    return token !== null ? token : null;
  }

  public isAuthenticated(): Observable<boolean> {
    return this.$isLog.asObservable();
  }


  logout() {
    this.$isLog.next(false); // Indiquer que l'utilisateur n'est plus connecté
    localStorage.removeItem('auth_token'); // Supprimer le jeton d'authentification
    this.alertService.showSuccessAlert('Vous êtes maintenant déconnecté'); // Afficher une alerte de déconnexion
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
     
    }
    return throwError(msg);
  }
  public getUserMailFromToken(token: string | null): string | null {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      console.log('decodedToken', decodedToken.sub);
      return decodedToken.sub;
    }
    return null;
  }
  
  getUserProfile(): Observable<User> {
    const token = this.getAuthToken();
    const userEmail = this.getUserMailFromToken(token);
  
    if (userEmail) {
      return this.userService.getUserByEmail(userEmail).pipe(
        catchError((error: any) => {
          console.error('Erreur lors de la récupération du profil utilisateur :', error);
          return throwError(error);
        })
      );
    } else {
      return throwError('Adresse e-mail de l\'utilisateur non valide');
    }
  }

  
}

