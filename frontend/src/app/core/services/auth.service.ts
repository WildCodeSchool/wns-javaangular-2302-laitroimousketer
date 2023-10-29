import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, take, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AlertService } from './alert.service';

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

  userId: number = 0;
  userEmail: string = '';
  userFirstname: string = '';
  userLastname: string = '';
  userRole: string = '';

  constructor(
    private alertService: AlertService,
    private httpClient: HttpClient,
    private userService: UserService,
  ) {

    this.isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthenticated: boolean) => {
        this.isLog$.next(isAuthenticated);
      });
      // check tte les 5 minutes si le token est valide
      setInterval(() => {
        this.checkTokenValidity();
      }, 300000);
    
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
  checkTokenValidity() {
    const token = this.getAuthToken();
    if (this.isTokenValid(token)) {
      const decodedToken: any = jwt_decode(token!);
      const expirationTime = decodedToken.exp * 1000; // Convertir la date d'expiration en millisecondes
      const currentTime = Date.now();
  
      // Vérifie si le token expire dans les 5 prochaines minutes
      if (expirationTime - currentTime <= 300000) {
        // Déclenche une alerte ou toute autre action nécessaire
        this.showTokenExpirationAlert();
      }
    } else {
      // Si le token n'est pas valide, déconnectez l'utilisateur
      this.logout();
    }
  }
  

  showTokenExpirationAlert() {
    this.alertService.showErrorAlert('Votre session va expirer dans 5 minutes');
  }

  isTokenValid(token: string | null): boolean {
    if (!token) {
      return false; // Le token est invalide s'il est nul
    }
    const decodedToken: any = jwt_decode(token);
    const expirationTime = decodedToken.exp * 1000; // Convertir la date d'expiration en millisecondes

    return expirationTime > Date.now(); // Vérifiez si la date d'expiration est supérieure à l'heure actuelle
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    const registerData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
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
          this.userId = user.id;
          this.userEmail = userEmail; // Définis l'e-mail de l'utilisateur
          this.userFirstname = user.firstname;
          this.userLastname = user.lastname; // Définis le nom de l'utilisateur à partir des données de l'utilisateur
          this.userRole = user.roleTitle;
          // console.log('Infos utilisateur récupérées:', this.userEmail, this.userFirstname, this.userLastname);
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

