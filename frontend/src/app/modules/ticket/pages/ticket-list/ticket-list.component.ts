import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent {

  tickets: Ticket[] | undefined;
  constructor(
    private ticketService: TicketService,
    private router : Router    
    ){}
  
    ngOnInit(){
      this.getTicketList(); 
    }

    getTicketList(){
      this.ticketService.getTicketList().subscribe(
        data => {
          this.tickets = data
        }
      );
    }

    deleteTicket(ticketId : any){
      if (Number.isInteger(ticketId)){        
        this.ticketService.deleteTicket(ticketId).subscribe(
          data => this.getTicketList(),
        );
      }
      else {
        console.error('Invalid ticket id:', ticketId);
      }
    }

    openDeleteModal(ticketId : any) {
      document.getElementById("deleteModal"+ticketId)?.classList.remove("d-none"); 
      document.getElementById("deleteModal"+ticketId)?.classList.add("d-block"); 
    }

    closeDeleteModal(ticketId : any){
      document.getElementById("deleteModal"+ticketId)?.classList.remove("d-block"); 
      document.getElementById("deleteModal"+ticketId)?.classList.add("d-none"); 
    }    
}
