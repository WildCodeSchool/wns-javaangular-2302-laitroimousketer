import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { UnsubcribeComponent } from 'src/app/core/classes/unsubscribe.component';
import { Category } from 'src/app/core/models/category.model';
import { Priority } from 'src/app/core/models/priority.model';
import { Status } from 'src/app/core/models/status.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { PriorityService } from 'src/app/core/services/priority.service';
import { StatusService } from 'src/app/core/services/status.service';
import * as Reducer from 'src/app/store/reducers/index';
import * as ticketAction from 'src/app/store/actions/ticket.action';
@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent extends UnsubcribeComponent implements OnInit, OnChanges {
  @Input() ticket?: Ticket;
  @Input() page: string = '';
  @Output() annulate = new EventEmitter<void>();
  categories: Category[] = [];
  priorities: Priority[] = [];
  statuses: Status[] = [];
  ticketEditForm!: FormGroup;

  constructor(
    private store: Store<Reducer.StateDataStore>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private priorityService: PriorityService,
    private statusService: StatusService,) {
    super();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page']) {
      const newPageValue = changes['page'].currentValue as string;

      // dispatch action to reset the form and close the component if the page is not 'Info'
      if (newPageValue !== 'Info') {
        this.onAnnulate();
      }
    }
  }
  ngOnInit() {
    this.initForm();
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
    this.priorityService.getAll().subscribe((data) => {
      this.priorities = data;
      console.log(this.priorities);
    });
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data;
    });
  }

  initForm() {
    this.ticketEditForm = this.fb.group({
      title: [this.ticket?.ticketTitle, Validators.required],
      selectedPriority: [this.ticket?.priority, Validators.required],
      selectedCategory: [this.ticket?.category, Validators.required],
      selectedStatus: [this.ticket?.status, Validators.required],
      description: [this.ticket?.description, Validators.required],
    });

    this.ticketEditForm.get('selectedStatus')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      this.ticketEditForm.patchValue({ status: status });
    });
    this.ticketEditForm.get('selectedCategory')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((selectedCategory) => {
      this.ticketEditForm.patchValue({ selectedCategory: selectedCategory }, { emitEvent: false });
    });
    this.ticketEditForm.get('selectedPriority')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((selectedPriority) => {
      this.ticketEditForm.patchValue({ selectedPriority: selectedPriority });
    });
  }

  editTicket() {
    if (this.ticketEditForm.valid) {
      const updatedTicket: Partial<Ticket> = {
        ...this.ticket,
        ticketTitle: this.ticketEditForm.value.title,
        description: this.ticketEditForm.value.description,
        priority: this.ticketEditForm.value.selectedPriority,
        category: this.ticketEditForm.value.selectedCategory,
        status: this.ticketEditForm.value.selectedStatus
      };

      // Dispatch your update action here
      this.store.dispatch(ticketAction.updateTicket({ payload: updatedTicket }));

      // Reset the form after editing
      this.onAnnulate();
    }
  }

  onAnnulate() {
    this.ticketEditForm.reset();
    this.annulate.emit();
  }
}
