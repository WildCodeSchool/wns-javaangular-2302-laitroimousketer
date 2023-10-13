import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChatMessage } from '../models/chatMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
   }

  getChats() {
    return this.http.get(`${this.apiUrl}api/chat`);
  }

  addChat(chat: ChatMessage) {
    return this.http.post(`${this.apiUrl}api/chat`, chat, { headers: this.headers });
  }

}
