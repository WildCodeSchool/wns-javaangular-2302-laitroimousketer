import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/features/ticket/models/category';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { CategoryService } from 'src/app/features/ticket/services/category.service';
import { TicketService } from 'src/app/features/ticket/services/ticket.service';


@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss']
})
export class TicketAddComponent {

  constructor(
    private ticketService : TicketService,
    private categoryService : CategoryService,
    private fb : FormBuilder,
    private router : Router){}
    
    categoryforTicket = new Category();
    ticketToCreate = new Ticket();
    categories : Category[] = [];
    selectedCategory : number = 0;

    ticketAdditionForm = this.fb.group({
    title : ['title x', Validators.required],
    description : ['description x', Validators.required],
    selectedCategory : ['']
 });

  ngOnInit(){
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }
   addTicket(){
      if (this.ticketAdditionForm.value.title != null){
        this.ticketToCreate.ticketTitle = this.ticketAdditionForm.value.title;
      }
      if (this.ticketAdditionForm.value.description != null){
        this.ticketToCreate.description = this.ticketAdditionForm.value.description;
      }
      if (this.ticketAdditionForm.value.selectedCategory != null){
        this.selectedCategory =  parseInt(this.ticketAdditionForm.value.selectedCategory);
      }
      this.ticketService.createTicket(this.ticketToCreate, this.selectedCategory).subscribe(data => 
        console.log(data)
        );
      this.router.navigateByUrl("/tickets/list")
    }

}
