import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../features/ticket/models/category';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.baseUrl+'/categories');  
  }

  createTicket(ticket : Category): Observable<Category[]>{
    return this.httpClient.post<Category[]>(this.baseUrl, ticket);  
  }

  getTicket(categoryId : number): Observable<Category>{
    return this.httpClient.get<Category>(this.baseUrl+"/categories/"+categoryId);  
  }

  updateTicket(ticket : Category, categoryId : number): Observable<Category[]>{
    return this.httpClient.put<Category[]>(this.baseUrl+"/categories/"+categoryId, ticket);  
  }

  deleteTicket(categoryId : number): Observable<Category[]>{
    return this.httpClient.delete<Category[]>(this.baseUrl+"/categories/"+categoryId);  
  }

}
