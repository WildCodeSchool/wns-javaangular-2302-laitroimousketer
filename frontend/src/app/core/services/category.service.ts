import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends EntityCollectionServiceBase<Category> {
  private baseUrl = environment.apiUrl;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient,) {
    super('categories', serviceElementsFactory);
  }

  getCategoryList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.baseUrl+'/categories/');  
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
