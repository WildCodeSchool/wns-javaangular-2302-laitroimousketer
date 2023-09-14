import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';
import { CoreModule } from 'src/app/core/core.module';
import {MatSelectModule} from '@angular/material/select';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AvatarComponent } from 'src/app/core/components/avatar/avatar.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';
@NgModule({
  declarations: [
    TicketListComponent,
    TicketAddComponent,
    TicketEditComponent,
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
  
  ]
})
export class TicketModule { }
