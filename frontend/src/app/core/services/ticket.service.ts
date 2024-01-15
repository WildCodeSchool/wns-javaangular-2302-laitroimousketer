import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Category } from '../models/category';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends EntityCollectionServiceBase<Ticket> {
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
  ) {
    super('tickets', serviceElementsFactory);
  }

  getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.baseUrl + '/tickets/');
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.baseUrl + '/tickets/' + ticketId);
  }

  updateTicket(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>(this.baseUrl + '/tickets/' + ticketId, ticket);
  }

  deleteTicket(ticketId: number): Observable<Ticket[]> {
    return this.httpClient.delete<Ticket[]>(this.baseUrl + '/tickets/' + ticketId);
  }

  getTicketsByFilters(filter: string | number): Observable<Ticket[]> {
    // console.log('filters: ',filter);
    return this.httpClient.get<Ticket[]>(this.baseUrl + '/tickets/?' + filter);
  }
  getTicketCountByFilters(filter: string): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/tickets/?' + filter);
  }


}
