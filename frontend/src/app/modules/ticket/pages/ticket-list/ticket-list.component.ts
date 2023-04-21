import { Component } from '@angular/core';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {

  tickets: Ticket[] | undefined;
  t1 = new Ticket();
  constructor(private ticketService: TicketService){}
  
    ngOnInit(){
      this.tickets = [this.t1];
      this.t1.id=3;

      this.getTicketList(); 
    }

    getTicketList(){

      this.ticketService.getTicketList().subscribe(
        data => this.tickets = data,
      );
      console.log(this.ticketService.getTicketList().subscribe(
        data => this.tickets = data,
      ));
    }
}
