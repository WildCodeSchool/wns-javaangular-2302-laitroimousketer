import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { GlobalHistorical } from '../models/global-historical.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalHistoricalService extends EntityCollectionServiceBase<GlobalHistorical> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient,
  ) {
    super('global_historical', serviceElementsFactory)
  }




}
