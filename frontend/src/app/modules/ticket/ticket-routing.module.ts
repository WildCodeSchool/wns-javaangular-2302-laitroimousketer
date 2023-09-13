import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketAddComponent } from './components/ticket-add/ticket-add.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';

const routes: Routes = [
  {
    path:'list',
    component: TicketListComponent
  },
  {
    path:'create',
    component: TicketAddComponent
  },
  {
    path:'edit/:id',
    component: TicketEditComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
