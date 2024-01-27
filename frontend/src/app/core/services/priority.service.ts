import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/core/models/priority.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PriorityService extends EntityCollectionServiceBase<Priority> {

  private baseUrl = environment.apiUrl

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private httpClient: HttpClient) {
    super('priorities', serviceElementsFactory)}

  getPriorityList(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(this.baseUrl+'/priorities/');
  }

}
