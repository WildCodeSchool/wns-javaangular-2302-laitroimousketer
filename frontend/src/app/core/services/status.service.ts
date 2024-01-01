import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Status } from 'src/app/features/ticket/models/Status';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StatusService extends EntityCollectionServiceBase<Status> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient) {
    super('status', serviceElementsFactory)}

}
