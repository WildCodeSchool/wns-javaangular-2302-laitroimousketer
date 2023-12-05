import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, mergeMap, tap } from "rxjs/operators";
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

  // getTicketToDisplay$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(sidebarAction.displayTicketDetails),
  //         return sidebarAction.displayDetailContact();
  //       })
 




}
