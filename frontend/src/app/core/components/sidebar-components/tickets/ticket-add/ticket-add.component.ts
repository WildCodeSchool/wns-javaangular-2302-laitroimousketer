import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Status } from 'src/app/core/models/status.model';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { TicketService } from 'src/app/core/services/ticket.service';
import { Store } from '@ngrx/store';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
import * as sidebarAction from 'src/app/store/actions/sidebar.action';
import { Priority } from 'src/app/core/models/priority.model';
import { PriorityService } from 'src/app/core/services/priority.service';
import { User } from 'src/app/core/models/user.model';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { StatusService } from 'src/app/core/services/status.service';
import { MenuItems } from '../../../layout/sidebar/sidebar-menu/menu-items.model';

@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.scss'],
})
export class TicketAddComponent extends UnsubcribeComponent {
  constructor(
    private store: Store<Reducer.StateDataStore>,
    private ticketService: TicketService,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private statusService: StatusService,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
    
  }

  menuItems: MenuItems[] = [{ page: 'Info', icon: '' }];

  menuTitle: string = 'Ticket';
  menuIcon: string = 'bi bi-bookmark-plus-fill';
  categoryforTicket = {} as Category;
  ticketToCreate = {} as Ticket;
  categories: Category[] = [];
  priorities: Priority[] = [];
  status: Status[] = [];
  defaultStatus = {} as Status;
  author!: User;
  ticketAddForm!: FormGroup

 ;

  ngOnInit() {
    this.getAuthor();
    this.initForm();
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
    this.priorityService.getAll().subscribe((data) => {
      this.priorities = data;
    });
    this.initDefaultStatus();
  }

  initForm() {
    this.ticketAddForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      selectedCategory: ['', Validators.required],
      selectedPriority: ['', Validators.required],
    });
  
    // Ecoutez les changements de sélection pour la catégorie
    this.ticketAddForm.get('selectedCategory')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((selectedCategory) => {

      this.ticketAddForm.patchValue({ selectedCategory: selectedCategory }, { emitEvent: false });
    });
  
    // Ecoutez les changements de sélection pour la priorité
    this.ticketAddForm.get('selectedPriority')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((selectedPriority) => {

      this.ticketAddForm.patchValue({ selectedPriority: selectedPriority }, { emitEvent: false });
    });
  }
  
  initDefaultStatus() {
    this.statusService.getAll().subscribe((data) => {
      this.status = data;
      this.defaultStatus = this.status.find((status) => status.statusTitle === 'À faire') as Status;
    });
  }
  getAuthor() {
    this.store.select(Reducer.getUserConnected)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.author = data;
        console.log(this.author, 'author');
      });
  }


  addTicket() {
    if (this.ticketAddForm.valid) {
      const payload = {
        ticketTitle: this.ticketAddForm.value.title,
        priority: {
          id: this.ticketAddForm.value.selectedPriority.id,
          priorityTitle: this.ticketAddForm.value.selectedPriority.priorityTitle
        },
        description: this.ticketAddForm.value.description,
        category: {
          id: this.ticketAddForm.value.selectedCategory.id,
          categoryTitle: this.ticketAddForm.value.selectedCategory.categoryTitle
        },
        status: this.defaultStatus,
        author: this.author
      } as Ticket;
  
      // console.log(payload, 'payload');

      this.store.dispatch(ticketAction.createTicket({ payload }));
      this.store.dispatch(sidebarAction.resetSideBar());
    }
  }
  

  annulate() {
    this.store.dispatch(sidebarAction.resetSideBar());
  }
}
