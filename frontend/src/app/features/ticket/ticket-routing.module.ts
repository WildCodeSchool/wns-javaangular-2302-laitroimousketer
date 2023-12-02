import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';


const routes: Routes = [
  {
    path:'list',
    component: TicketsListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
