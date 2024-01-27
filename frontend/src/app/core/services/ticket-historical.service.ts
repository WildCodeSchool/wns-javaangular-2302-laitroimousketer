import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { TicketHistorical } from '../models/ticket-historical.model';

@Injectable({
  providedIn: 'root'
})
export class TicketHistoricalService extends EntityCollectionServiceBase<TicketHistorical> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient,
  ) {
    super('ticket_historical', serviceElementsFactory)
  }




}
