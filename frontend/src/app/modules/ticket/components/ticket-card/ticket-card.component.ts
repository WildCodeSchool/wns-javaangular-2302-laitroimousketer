import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss']
})


export class TicketCardComponent implements OnInit {

    number: number = 0;
    name: string = '';
    author: string = '';
    date: string = '';
    status: string = '';
    dev? : string = '';
  
  
@Input() ticket!: Ticket;

  constructor() { }

  ngOnInit() {
    if (this.ticket != undefined) {
      console.log(this.ticket);
      this.number = this.ticket.id;
    }
  }

}
