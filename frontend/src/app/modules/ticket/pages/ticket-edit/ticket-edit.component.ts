import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Ticket } from '../../models/Ticket';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent {

  ticketToUpdate = new Ticket;
  ticketId : number = 125;

  ticketAdditionForm = this.fb.group({
    title : ['', Validators.required],
    description : ['', Validators.required],
 });

  constructor(
    private ticketService : TicketService,
    private fb : FormBuilder,
    private activatedroute: ActivatedRoute,
    private router : Router
    ){}

    ngOnInit(){
      this.ticketId = this.activatedroute.snapshot.params['id'];
      this.ticketService.getTicket(this.ticketId).subscribe(
        data => {
          this.ticketToUpdate = data;
          this.ticketAdditionForm.setValue({title : this.ticketToUpdate.title, description : this.ticketToUpdate.description});
          console.log(this.ticketToUpdate)
        }        
        );
    }
      
      updateTicket(){
        if (this.ticketAdditionForm.value.title != null  ){
          this.ticketToUpdate.title = this.ticketAdditionForm.value.title;
          }
        if (this.ticketAdditionForm.value.description != null  ){
          this.ticketToUpdate.description = this.ticketAdditionForm.value.description ;
          }
          this.ticketService.updateTicket(this.ticketToUpdate, this.ticketId ).subscribe(
            data => { 
            console.log(data)
            this.router.navigateByUrl("/tickets/list")
            }
          );
      }
  
  }
  

