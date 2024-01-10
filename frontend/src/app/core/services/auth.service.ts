import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, take, throwError, tap, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as userAction from 'src/app/store/actions/user.action';
import { Address } from '../models/address.model';
//accessToken est le nom de la propriete du token renvoyée par le serveur
interface LoginResponse {
  accessToken: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private apiUrl = environment.apiUrl;
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public isLog$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private activeTabSource: BehaviorSubject<'login' | 'register'> = new BehaviorSubject<'login' | 'register'>('login');
  public activeTab$ = this.activeTabSource.asObservable();

userConnected!: User;

  constructor(
    private alertService: AlertService,
    private httpClient: HttpClient,
    private userService: UserService,
    private store: Store<Reducer.StateDataStore>,
  ) {

    this.isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthenticated: boolean) => {
        this.isLog$.next(isAuthenticated);
      });
  }

  ngOnInit(): void {
    this.getUserProfile();

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
          this.isLog$.next(true);
          // console.log('token reçu',response.accessToken)
          return response.accessToken;
        })
      );
  }

  isTokenExpired(): boolean {
    const token = this.getAuthToken();
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const expirationTime = decodedToken.exp * 1000;
        return expirationTime <= Date.now();
      } catch (error) {
        console.error('Erreur lors du décodage du jeton :', error);
        return true; // En cas d'erreur, considérez le jeton comme expiré
      }
    }
    return true; // Si le token est nul, considérez-le comme expiré
  }

  checkTokenExpiration() {
    const isTokenExpired = this.isTokenExpired();
    if (isTokenExpired) {
      // console.log('Le jeton est expiré.');
    } else {
      // console.log('Le jeton est valide.');
    }
  }

  register(firstname: string, lastname: string, email: string, phone: string, password: string, adress: Address): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    const registerData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      address: adress,
      phone: phone
    };

    return this.httpClient.post(url, registerData, this.httpOptions)
      .pipe(
        tap(() => {
          this.alertService.showSuccessAlert('Votre compte a été créé avec succès');
        })
      );
  }

  public setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public getAuthToken(): string | null {
    const token = localStorage.getItem('auth_token');
    // console.log('token', token);
    return token !== null ? token : null;
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLog$.asObservable();
  }

  logout() {
    this.isLog$.next(false); // Indiquer que l'utilisateur n'est plus connecté
    localStorage.removeItem('auth_token'); // Supprimer le jeton d'authentification
    this.alertService.showSuccessAlert('Vous êtes maintenant déconnecté'); // Afficher une alerte de déconnexion
  }

  public getUserMailFromToken(token: string | null): string | null {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      // console.log('decodedToken', decodedToken.sub);
      return decodedToken.sub;
    }
    return null;
  }

  getUserProfile(): Observable<User> {
    const token = this.getAuthToken();
    const userEmail = this.getUserMailFromToken(token);

    if (userEmail) {
      return this.userService.getUserByEmail(userEmail).pipe(
        map((user: User) => {
          this.userConnected = user;
          this.store.dispatch(userAction.saveUserConnected({ payload: user }));
          // console.log('Infos utilisateur récupérées:', this.userEmail, this.userFirstname, this.userLastname, this.userRole);
          return user;
        }),
        catchError((error: any) => {
          return throwError(() => new Error('Erreur lors de la récupération du profil utilisateur :', error));
        })
      );
    } else {
      return throwError(() => new Error('Adresse e-mail de l\'utilisateur non valide'));
    }
  }


}

