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

  getTicketList(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.baseUrl+'/tickets');
  }

  createTicket(ticket: Ticket, selectedCategory: number): Observable<Ticket[]> {
    const ticketWithCategory = { ...ticket, category: { id: selectedCategory } };
    console.log(ticketWithCategory);
    return this.httpClient.post<Ticket[]>(this.baseUrl+'/tickets', ticketWithCategory);
  }

  getTicket(ticketId: number): Observable<Ticket> {
    return this.httpClient.get<Ticket>(this.baseUrl+'/tickets/'+ticketId);
  }

  updateTicket(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>(this.baseUrl+'/tickets/'+ticketId,ticket);
  }
//TODO: voir si on peut refresh le ticket avec la réponse du back suite au put ?  le back renvoie l'ancien ticket, pas le nouveau suite au push en réponse, obligé de de refaire un get donc
  updateAndFetchTicket(ticketId: number, ticket: Ticket): Observable<Ticket> {
    return this.httpClient.put<Ticket>(this.baseUrl + '/tickets/' + ticketId, ticket).pipe(
      switchMap(() => this.httpClient.get<Ticket>(this.baseUrl + '/tickets/' + ticketId))
    );
  }

  archiveTicket(ticketId: number): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.baseUrl+'/tickets/archive/'+ ticketId, null, { observe: 'response' });
  }
  unarchiveTicket(ticketId: number): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.baseUrl+'/tickets/unarchive/'+ ticketId, null, { observe: 'response' });
  }
  deleteTicket(ticketId: number): Observable<Ticket[]> {
    return this.httpClient.delete<Ticket[]>(this.baseUrl+'/tickets/'+ticketId);
  }
  // TicketService
  getTicketsByFilters(filter: string): Observable<Ticket[]> {
    // console.log('filters: ',filter);
    return this.httpClient.get<Ticket[]>(this.baseUrl+'/tickets/filter?'+filter);
  }
  getCountTicketsByStatus(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl+'/tickets/countByStatus/'+filter);
  }
  getCountTicketsByPriority(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl+'/tickets/countByPriority/'+filter);
  }
  getCountTicketsByCategory(filter: string): Observable<number> {
    // console.log('filters: ',filter);
    return this.httpClient.get<number>(this.baseUrl+'/tickets/countByCategory/'+filter);
  }


  getAllCountTickets(): Observable<number> {
    return this.httpClient.get<number>(this.baseUrl+'/tickets/count');
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
    return this.getCountTicketsByCategory('BILLING');
  }

  getCountTicketsByCategoryFeature(): Observable<number> {
    return this.getCountTicketsByCategory('FEATURE');
  }

  getCountTicketsByCategoryTechnical(): Observable<number> {
    return this.getCountTicketsByCategory('TECHNICAL');
  }

}
