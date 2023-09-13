import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';
import { Router } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketAddComponent,
    TicketEditComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    TicketRoutingModule,
    ReactiveFormsModule,
  ]
})
export class TicketModule { }
