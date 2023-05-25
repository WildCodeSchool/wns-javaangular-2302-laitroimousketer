import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';
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


}
