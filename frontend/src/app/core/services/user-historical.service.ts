import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { UserHistorical } from '../models/user-historical.model';

@Injectable({
  providedIn: 'root'
})
export class UserHistoricalService extends EntityCollectionServiceBase<UserHistorical> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient,
  ) {
    super('user-historical', serviceElementsFactory)
  }




}
