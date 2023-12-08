import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as action from '../actions/ticket.action';
import * as sidebarAction from '../actions/sidebar.action';
import { catchError, concatMap, map, switchMap, tap } from "rxjs/operators";
import { AlertService } from "src/app/core/services/alert.service";
import { Ticket } from "src/app/features/ticket/models/ticket";
import { TicketService } from "src/app/features/ticket/services/ticket.service";
import { of } from "rxjs";


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
      switchMap(({ payload }) =>
        this.httpService.get<Ticket>(`${this.baseAPI}/tickets/${payload}`).pipe(
          map((ticket: Ticket) => action.saveTicket({ payload: ticket })),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la récupération des tickets');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    )
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.updateTicket),
      switchMap(({ payload }) =>
        this.httpService.put<Ticket>(`${this.baseAPI}/tickets/${payload.id}`, payload).pipe(
          map((data: Ticket) => action.saveTicket({ payload: data })),
          tap(() => this.msgService.showSuccessAlert('Ticket modifié')),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la modification du ticket');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    )
  );

  createTicket = createEffect(() =>
    this.actions$.pipe(
      ofType(action.createTicket),
      switchMap(({ payload }) =>
        this.httpService.post<Ticket>(`${this.baseAPI}/tickets`, payload).pipe(
          map((data: Ticket) => action.saveTicket({ payload: data })),
          tap(() => this.msgService.showSuccessAlert('Ticket créé')),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la création du ticket');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(action.deleteTicket),
      switchMap(({ payload }) =>
        this.httpService.delete(`${this.baseAPI}/tickets/${payload}`).pipe(
          tap(() => {
            this.msgService.showSuccessAlert('Ticket supprimé');
          }),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la suppression du ticket');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    ),
    { dispatch: false }
  );

  getTickets = createEffect(() =>
    this.actions$.pipe(
      ofType(action.getTickets),
      switchMap(() =>
        this.httpService.get<Ticket[]>(`${this.baseAPI}/tickets`).pipe(
          map((tickets: Ticket[]) => action.saveTickets({ payload: tickets })),
          catchError(error => {
            this.msgService.showErrorAlert('Erreur lors de la récupération des tickets');
            return of(/* action d'erreur si nécessaire */);
          })
        )
      )
    )
  );
}