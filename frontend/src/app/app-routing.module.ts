import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'tickets/list', pathMatch: 'full', /* canActivateChild: [AuthGuard]*/ },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'tickets', loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule), /*canActivateChild: [AuthGuard] */},
  {path: 'profile',loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
