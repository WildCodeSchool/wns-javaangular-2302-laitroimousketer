import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/features/ticket/models/Priority';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private baseUrl = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  getPriorityList(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(this.baseUrl+'/priority');
  }

}
