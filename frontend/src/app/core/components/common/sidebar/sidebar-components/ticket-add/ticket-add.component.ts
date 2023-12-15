import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/features/ticket/models/category';
import { Ticket } from 'src/app/features/ticket/models/ticket';
import { CategoryService } from 'src/app/core/services/category.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { MenuItems } from '../sidebar-menu/menu-items.model';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import { Priority } from 'src/app/features/ticket/models/Priority';
import { PriorityService } from 'src/app/core/services/priority.service';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
})
export class TicketAddComponent {
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  menuItems: MenuItems[] = [{ page: 'Info', icon: '' }];

  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-bookmark-plus-fill';
  categoryforTicket = new Category();
  ticketToCreate = new Ticket();
  categories: Category[] = [];
  priorities: Priority[] = [];
  selectedCategory: number = 0;

  ticketAdditionForm = this.fb.group({
    title: ['title x', Validators.required],
    description: ['description x', Validators.required],
    selectedCategory: [0, Validators.required],
    selectedPriority: [0, Validators.required],
  });

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe((data) => {
      this.categories = data;
    });

    this.priorityService.getPriorityList().subscribe((data) => {
      this.priorities = data;
      console.log(this.priorities); // Déplacer le console.log ici pour afficher les priorités récupérées
    });
  }

  addTicket() {
    if (!this.ticketAdditionForm.invalid) {
      const payload: any = {
        ticketTitle: this.ticketAdditionForm.value.title!,
        priorityId: this.ticketAdditionForm.value.selectedPriority!,
        description: this.ticketAdditionForm.value.description!,
        categoryId: this.ticketAdditionForm.value.selectedCategory!,
      };
      this.store.dispatch(ticketAction.createTicket({ payload }));
      this.router.navigateByUrl('/tickets/list');
    }
  }
}
