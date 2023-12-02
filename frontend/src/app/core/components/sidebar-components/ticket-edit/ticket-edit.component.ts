import { Component } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category } from 'src/app/features/ticket/models/category';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { CategoryService } from 'src/app/features/ticket/services/category.service';
import { TicketService } from 'src/app/features/ticket/services/ticket.service';


@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})

export class TicketEditComponent {

  categoryforTicket = new Category();
  ticketToUpdate = new Ticket();
  categories : Category[] = [];
  ticketId : number = 125;
  selectedCategory : number = 0;

  ticketAdditionForm = this.fb.group({
    title : ['', Validators.required],
    description : ['', Validators.required],
    selectedCategory : [0]
 });

  constructor(
    private ticketService : TicketService,
    private categoryService : CategoryService,
    private fb : FormBuilder,
    private activatedroute: ActivatedRoute,
    private router : Router
    ){}
  
    ngOnInit(){
      this.categoryService.getCategoryList().subscribe(
        data => this.categories = data
      );
      this.ticketId = this.activatedroute.snapshot.params['id'];
      this.ticketService.getTicket(this.ticketId).subscribe(
        data => {
          this.ticketToUpdate = data;
          if(this.ticketToUpdate.category !== undefined) {this.selectedCategory = this.ticketToUpdate.category?.id};
          this.ticketAdditionForm.setValue({title : this.ticketToUpdate.ticketTitle,
                                            description : this.ticketToUpdate.description,
                                            selectedCategory : this.selectedCategory});
        }        
        );
    }
      
      updateTicket(){
        if (this.ticketAdditionForm.value.title != null  ){
          this.ticketToUpdate.ticketTitle = this.ticketAdditionForm.value.title;
          }
        if (this.ticketAdditionForm.value.description != null  ){
          this.ticketToUpdate.description = this.ticketAdditionForm.value.description ;
          }
          if (this.ticketAdditionForm.value.selectedCategory != null){
            this.selectedCategory =  this.ticketAdditionForm.value.selectedCategory;
          }    
        this.ticketService.updateTicket(this.ticketId, this.ticketToUpdate).subscribe(
            data => { 
            this.router.navigateByUrl("/tickets/list")
            }
          );
      }
  
  }
  

