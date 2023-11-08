import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'tickets', loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule), canActivate: [AuthGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'tickets/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'tickets/list', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
