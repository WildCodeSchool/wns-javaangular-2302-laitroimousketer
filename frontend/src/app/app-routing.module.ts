import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // ajouter: canActivate: [AuthGuard] pour protéger les routes //
  {path: '', redirectTo: 'tickets/list', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'tickets',loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule)},
  {path: 'profile',loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
