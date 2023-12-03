import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as sidebarAction from '../actions/sidebar.action';
import * as ticketAction from '../actions/ticket.action';
import * as Reducer from '../reducers/index';
import { TicketService } from "src/app/features/ticket/services/ticket.service";
import { AlertService } from "src/app/core/services/alert.service";
import { Ticket } from "src/app/features/ticket/models/ticket";
import { of, Observable } from "rxjs";
import { Action } from '@ngrx/store';

@Injectable()
export class SidebarEffects {
  constructor(
    private actions$: Actions,
    private ticketService: TicketService,
    private alertService: AlertService,
    private store: Store<Reducer.StateDataStore>,
  ) {}

  //!! non fonctionnel s'inspirer des effect de ticket pr le recupéré correctement
//   getTicketAndDisplayDetails = createEffect(() =>
//   this.actions$.pipe(
//     ofType(ticketAction.getTicket),
//     switchMap(({ payload }) =>
//       this.ticketService.getByKey(payload).pipe(
//         map((data: Ticket) => ticketAction.saveTicket({ payload: data })),
//         catchError(error => {
//           this.alertService.showErrorAlert('Erreur lors de la récupération du ticket');
//           return of(/* action d'erreur si nécessaire */);
//         })
//       )
//     )
//   )
// );
  getTicketAndDisplayDetails = createEffect(() =>
  this.actions$.pipe(
    ofType(ticketAction.getTicket),
    switchMap(({ payload }) =>
      this.ticketService.getByKey(payload).pipe(
        mergeMap((data: Ticket) => [
          ticketAction.saveTicket({ payload: data }),
          sidebarAction.displayTicketDetails({ payload: data.id })
        ]),
        catchError(error => {
          this.alertService.showErrorAlert('Erreur lors de la récupération du ticket');
          return of(/* action d'erreur si nécessaire */);
        })
      )
    )
  )
);
}
