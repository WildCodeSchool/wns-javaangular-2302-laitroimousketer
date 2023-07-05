import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map, take, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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

  constructor(private httpClient: HttpClient, private router: Router) {
    const storedToken = this.getAuthToken();
    this.isAuthenticated()
      .pipe(take(1))
      .subscribe((isAuthenticated: boolean) => {
        this.$isLog.next(isAuthenticated);
      });
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
          console.log('register', registerData);
        })
      );
  }
  
  
  public setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public isAuthenticated(): Observable<boolean> {
    return this.$isLog.asObservable();
  }


  logout() {
    this.$isLog.next(false); // Indiquer que l'utilisateur n'est plus connecté
    localStorage.removeItem('auth_token'); // Supprimer le jeton d'authentification
    console.log('logout', localStorage.getItem('auth_token'));
    console.log('local storage',localStorage)
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
}
