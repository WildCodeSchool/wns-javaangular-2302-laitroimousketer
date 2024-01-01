import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { Ticket } from '../../features/ticket/models/ticket';
import { Category } from '../../features/ticket/models/category';
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
    return this.httpClient.get<Ticket[]>(this.baseUrl + '/tickets');
  }

  createTicket(ticket: Ticket, selectedCategory: number): Observable<Ticket[]> {
    const ticketWithCategory = { ...ticket, category: { id: selectedCategory } };
    console.log(ticketWithCategory);
    return this.httpClient.post<Ticket[]>(this.baseUrl + '/tickets', ticketWithCategory);
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.baseUrl + '/tickets/' + ticketId);
  }

  updateTicket(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>(this.baseUrl + '/tickets/' + ticketId, ticket);
  }


  archiveTicket(ticketId: number): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.baseUrl + '/tickets/archive/' + ticketId, null, { observe: 'response' });
  }
  unarchiveTicket(ticketId: number): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.baseUrl + '/tickets/unarchive/' + ticketId, null, { observe: 'response' });
  }
  deleteTicket(ticketId: number): Observable<Ticket[]> {
    return this.httpClient.delete<Ticket[]>(this.baseUrl + '/tickets/' + ticketId);
  }
  // TicketService
  getTicketsByFilters(filter: string | number): Observable<Ticket[]> {
    // console.log('filters: ',filter);
    return this.httpClient.get<Ticket[]>(this.baseUrl + '/tickets/filter?' + filter);
  }
  getTicketCountByFilters(filter: string): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/tickets/filter?' + filter);
  }

  getAllCountTickets(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl + '/tickets/count');
  }
  getCountTicketsByStatus(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl + '/tickets/filters?' + filter);
  }
  getCountTicketsByPriority(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl + '/tickets/filters?' + filter);
  }
  getCountTicketsByCategory(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl + '/tickets/filters?' + filter);
  }
  
}
