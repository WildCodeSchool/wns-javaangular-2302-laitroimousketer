import { Component, Input, OnInit } from '@angular/core';
import { TicketHistorical } from 'src/app/core/models/ticket-historical.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketHistoricalService } from 'src/app/core/services/ticket-historical.service';

@Component({
  selector: 'app-ticket-historical',
  templateUrl: './ticket-historical.component.html',
  styleUrls: ['./ticket-historical.component.scss']
})
export class TicketHistoricalComponent implements OnInit {
@Input() ticket?: Ticket;
ticketHistoricals: TicketHistorical [] = [];
  constructor(
    private ticketHistoricalService: TicketHistoricalService,
 
  ) { }

  ngOnInit() {
    this.getTicketHistorical();
  }
getTicketHistorical() {
  this.ticketHistoricalService.getWithQuery(`ticketId=${this.ticket?.id}`).subscribe((ticketHistoricals: any) => {
    this.ticketHistoricals = ticketHistoricals;
    console.log(ticketHistoricals);
  })
}
}
