import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityCollectionServiceBase<User> {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory,) {
    super('users', serviceElementsFactory);
  }

  //CRUD
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/`);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  //others
  getUsersByRoleId(roleId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/?role_id=${roleId}`);
  }
  
  getUsersByRoleTitle(roleTitle: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/?role=${roleTitle}`);
  }

  getUsersByNameOrEmail(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/?search=${searchTerm}`);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, user);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/?email=${email}`);
  }

  


}
