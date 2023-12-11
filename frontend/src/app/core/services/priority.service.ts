import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/features/ticket/models/Priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private baseUrl = "http://localhost:8080/api/priority";

  constructor(private httpClient: HttpClient) { }

  getPriorityList(): Observable<Priority[]> {
    return this.httpClient.get<Priority[]>(this.baseUrl);
  }

}
