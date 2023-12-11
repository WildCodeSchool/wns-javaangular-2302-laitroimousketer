import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as action from '../actions/ticket.action';
import * as sidebarAction from '../actions/sidebar.action';
import { crudOperationSuccess } from './../actions/ticket.action';
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AlertService } from "src/app/core/services/alert.service";
import { Ticket } from "src/app/features/ticket/models/ticket";
import { TicketService } from "src/app/core/services/ticket.service";


@Injectable()
export class TicketEffects {
  baseAPI = environment.apiUrl;
  constructor(
    private actions$: Actions,
    private httpService: HttpClient,
    private msgService: AlertService,
    private ticketService: TicketService,


  ) { }


  getTicket = createEffect(() =>
  this.actions$.pipe(
    ofType(action.getTicket),
    switchMap(({ payload, displayInSidebar }) => {
      return this.ticketService.getByKey(payload).pipe(
        tap((data: Ticket) => {
          console.log('Ticket récupéré dans getTicket:', data);
        }),
        switchMap((data: Ticket) => {
          const saveTicketAction = action.saveTicket({ payload: data });

          if (displayInSidebar) {
            return [
              saveTicketAction,
              sidebarAction.displayTicketDetails()
            ];
          } else {
            return [saveTicketAction];
          }
        }),
        catchError(error => {
          this.msgService.showErrorAlert('Erreur lors de la récupération du ticket');
          // Gérer les erreurs ici si nécessaire
          return of(/* action d'erreur si besoin */);
        })
      );
    })
  )
);


  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateTicket),
      switchMap(({ payload }) =>
        this.ticketService.update(payload).pipe(
          map((data: Ticket) => action.saveTicket({ payload: data })),
          tap(() => this.msgService.showSuccessAlert('Ticket modifié')),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la modification du ticket');
            // Gérer les erreurs ici si nécessaire
            return of(/* action d'erreur si besoin */);
          })
        )
      )
    )
  );



createTicket = createEffect(() =>
this.actions$.pipe(
  ofType(action.createTicket),
  switchMap(({ payload }) => {
    console.log('Ticket créé dans createTicket:', payload);
    return this.ticketService.add(payload).pipe(
 
      map((data: Ticket) => action.saveTicket({ payload: data })),
      tap(() => this.msgService.showSuccessAlert('Ticket créé')),
      catchError(error => {
        this.msgService.showErrorAlert('Erreur lors de la création du ticket');
        // Gérer les erreurs ici si nécessaire
        return of(/* action d'erreur si besoin */);
      })
    )
    })
));


  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteTicket),
      switchMap(({ payload }) =>
        this.ticketService.delete(payload).pipe(
          tap(() => {
            this.msgService.showSuccessAlert('Ticket supprimé');
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la suppression du ticket');
            // Gérer les erreurs ici si nécessaire
            return of(/* action d'erreur si besoin */);
          })
        )
      )
    ), { dispatch: false } // Ajoutez cette ligne si vous ne souhaitez pas déclencher d'action
  );


  getTickets = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getTickets),
      switchMap(() => {
        return this.ticketService.getTicketList().pipe(
          map((tickets: Ticket[]) => {
            return action.saveTickets({ payload: tickets });
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la récupération des tickets');
            return of(/* action d'erreur si besoin */);
          })
        );
      })
    )
  );


}

