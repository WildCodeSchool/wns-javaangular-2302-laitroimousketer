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
}
