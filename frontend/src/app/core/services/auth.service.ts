import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseAPI = "http://localhost:8080/api";
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public isLog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLog$: Observable<boolean> = this.isLog.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('auth_token');
    this.isLog.next(this.isAuthenticated());
  }

  public login(login: string, password: string): Observable<string> {
    return this.httpClient
      .post<LoginResponse>(`${this.baseAPI}/login`, { login, password }, this.httpOptions)
      .pipe(
        map((response: LoginResponse) => {
          localStorage.setItem('auth_token', response.token);
          this.isLog.next(true);
          return response.token;
        })
      );
  }

  public register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseAPI}/users/register`,
      { username, email, password },
      this.httpOptions
    );
  }

  public logout(): Observable<void> {
    this.router.navigate(['login']);
    return this.httpClient.post<void>(`${this.baseAPI}/logout`, {}, this.httpOptions).pipe(
      map(() => {
        localStorage.removeItem('auth_token');
        this.isLog.next(false);
      })
    );
  }

  public isAuthenticated(): boolean {
    const storedToken = localStorage.getItem('auth_token');
    // pour tester le jeton et l'afficher dans la console //
    console.log('jwt token',storedToken);
    return storedToken !== null;
  }
}

