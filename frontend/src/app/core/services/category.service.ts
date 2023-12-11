import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../features/ticket/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/api/categories";

  constructor(private httpClient: HttpClient) { }

  getCategoryList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.baseUrl);  
  }

  createTicket(ticket : Category): Observable<Category[]>{
    return this.httpClient.post<Category[]>(this.baseUrl, ticket);  
  }

  getTicket(categoryId : number): Observable<Category>{
    return this.httpClient.get<Category>("http://localhost:8080/api/categories/"+categoryId);  
  }

  updateTicket(ticket : Category, categoryId : number): Observable<Category[]>{
    return this.httpClient.put<Category[]>("http://localhost:8080/api/categories/"+categoryId, ticket);  
  }

  deleteTicket(categoryId : number): Observable<Category[]>{
    return this.httpClient.delete<Category[]>("http://localhost:8080/api/categories/"+categoryId);  
  }

}
