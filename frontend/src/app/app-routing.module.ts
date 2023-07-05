import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';

const routes: Routes = [
  // canActivateChild: [AuthGuard] bloque tout le module si pas autorisé, canActivate bloque juste la route d'une page, ici c'est des modules donc on utilise canActivateChild
  {path: '', redirectTo: 'tickets/list', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {path: 'tickets',loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule), canActivateChild: [AuthGuard]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
