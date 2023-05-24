import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/Ticket';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = "http://localhost:8080/api/tickets";

  constructor(private httpClient: HttpClient) { }

  getTicketList(): Observable<Ticket[]>{
    return this.httpClient.get<Ticket[]>(this.baseUrl);  
  }

  createTicket(ticket : Ticket): Observable<Ticket[]>{
    return this.httpClient.post<Ticket[]>(this.baseUrl, ticket);  
  }

  getTicket(ticketId : number): Observable<Ticket>{
    return this.httpClient.get<Ticket>("http://localhost:8080/api/tickets/"+ticketId);  
  }

  updateTicket(ticket : Ticket, ticketId : number): Observable<Ticket[]>{
    return this.httpClient.put<Ticket[]>("http://localhost:8080/api/tickets/"+ticketId, ticket);  
  }

  deleteTicket(ticketId : number): Observable<Ticket[]>{
    return this.httpClient.delete<Ticket[]>("http://localhost:8080/api/tickets/"+ticketId);  
  }


}
