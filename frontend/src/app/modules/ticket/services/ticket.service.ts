import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = "http://localhost:8080/api/tickets";

  constructor(private httpClient: HttpClient) { }

  getTicketList(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(this.baseUrl);  
  }

  createTicket(ticket : Ticket, selectedCategory : number): Observable<Ticket[]>{
    const ticketWithCategory = {...ticket, category : {id :selectedCategory}};
    console.log(ticketWithCategory);
    return this.httpClient.post<Ticket[]>(this.baseUrl, ticketWithCategory);  
  }

  getTicket(ticketId : number): Observable<Ticket>{
    return this.httpClient.get<Ticket>("http://localhost:8080/api/tickets/"+ticketId);  
  }

  updateTicket(ticket : Ticket, ticketId : number, selectedCategory : number): Observable<Ticket[]>{
    const ticketWithCategory = {...ticket, category : {id :selectedCategory}};    
    return this.httpClient.put<Ticket[]>("http://localhost:8080/api/tickets/"+ticketId, ticketWithCategory);  
  }

  deleteTicket(ticketId : number): Observable<Ticket[]>{
    return this.httpClient.delete<Ticket[]>("http://localhost:8080/api/tickets/"+ticketId);  
  }
  // TicketService

  getTicketsByFilters(filter : string): Observable<Ticket[]> {
    // console.log('filters: ',filter);
    return this.httpClient.get<Ticket[]>(`http://localhost:8080/api/tickets/filter?${filter}`);
  }
  getCountTicketsByStatus(filter : string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(`http://localhost:8080/api/tickets/countByStatus/${filter}`);
  }
  getCountTicketsByPriority(filter : string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(`http://localhost:8080/api/tickets/countByPriority/${filter}`);
  }
  getCountTicketsByCategory(filter : string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(`http://localhost:8080/api/tickets/countByCategory/${filter}`);
  }
  



  getCountTicketsByStatusToDo(): Observable<number> {
    return this.getCountTicketsByStatus('TO_DO');
  }
  getCountTicketsByStatusDoing(): Observable<number> {
    return this.getCountTicketsByStatus('DOING');
  }
  getCountTicketsByStatusDone(): Observable<number> {
    return this.getCountTicketsByStatus('DONE');
  }

  getCountTicketsByPriorityLow(): Observable<number> {
    return this.getCountTicketsByPriority('LOW');
  }
  getCountTicketsByPriorityMedium(): Observable<number> {
    return this.getCountTicketsByPriority('MEDIUM');
  }
  getCountTicketsByPriorityHigh(): Observable<number> {
    return this.getCountTicketsByPriority('HIGH');
  }

  getCountTicketsByCategoryBilling(): Observable<number> {
    return this.getCountTicketsByCategory('BILLING_PAYMENT');
  }

  getCountTicketsByCategoryFeature(): Observable<number> {
    return this.getCountTicketsByCategory('FEATURE_REQUEST');
  }

  getCountTicketsByCategoryTechnical(): Observable<number> {
    return this.getCountTicketsByCategory('TECHNICAL_SUPPORT');
  }

}
