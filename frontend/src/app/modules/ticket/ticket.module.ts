import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';

import { CoreModule } from 'src/app/core/core.module';
import { MatSelectModule } from '@angular/material/select';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TicketCardComponent } from 'src/app/modules/ticket/components/ticket-card/ticket-card.component';
import { TicketListClientComponent } from './pages/tickets-list-client/tickets-list-client.component';


@NgModule({
  declarations: [
    TicketsListComponent,
    TicketListClientComponent,
    TicketCardComponent,


  ],
  imports: [
    CommonModule,
    CoreModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    CdkVirtualScrollViewport,
    ScrollingModule,
    MatExpansionModule,
    DatePipe,
    MatCheckboxModule,


  ],
  exports: [
  
  ],

  providers: [DatePipe], // 
})
export class TicketModule { }
