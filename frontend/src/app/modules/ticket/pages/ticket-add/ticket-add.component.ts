import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/Ticket';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss']
})
export class TicketAddComponent {

  constructor(
    private ticketService : TicketService,
    private fb : FormBuilder,
    private router : Router){}
  
    ticketToCreate = new Ticket;

   ticketAdditionForm = this.fb.group({
    title : ['title x', Validators.required],
    description : ['description x', Validators.required],
 });

    addTicket(){
      if (this.ticketAdditionForm.value.title != null){
        this.ticketToCreate.title = this.ticketAdditionForm.value.title;
      }
      if (this.ticketAdditionForm.value.description != null){
        this.ticketToCreate.description = this.ticketAdditionForm.value.description;
      }

      this.ticketService.createTicket(this.ticketToCreate).subscribe(data => 
        console.log(data)
        );
      this.router.navigateByUrl("/tickets/list")
    }

}
