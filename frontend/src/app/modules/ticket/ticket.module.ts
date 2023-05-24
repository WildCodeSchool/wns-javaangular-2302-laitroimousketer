import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketAddComponent } from './pages/ticket-add/ticket-add.component';
import { TicketEditComponent } from './pages/ticket-edit/ticket-edit.component';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketAddComponent,
    TicketEditComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule
  ]
})
export class TicketModule { }
