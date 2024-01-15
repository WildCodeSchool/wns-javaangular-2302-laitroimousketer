import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chat } from 'src/app/core/models/chat.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { ChatService } from 'src/app/core/services/chat.service';


@Component({
  selector: 'app-ticket-chat',
  templateUrl: './ticket-chat.component.html',
  styleUrls: ['./ticket-chat.component.scss']
})
export class TicketChatComponent implements OnInit {
  @Input() ticket?: Ticket;
  newMessage: string = '';
  messages: string[] = [];
  chat: Chat[] = [];
  
  chatForm!: FormGroup;
  constructor(
    private chatService: ChatService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.initChatForm();
    this.getChatMessages();
  }

initChatForm() {
    this.chatForm = this.fb.group({
      message: [''],
      ticket_id: [this.ticket?.id],
      author: [''],
      date: [''],
      media: [''],

    });
  }
  getChatMessages() {
    this.chatService.getWithQuery(`ticket_id=${this.ticket?.id}`).subscribe((data: any) => {
      console.log("data chat with filters",data);
      this.chat = data;
    });
  }


  sendMessage() {

  }


}
