import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/features/ticket/models/ticket';


export const action = {
  GET_TICKET: '[DataStore] Get Ticket',
  GET_TICKETS: '[DataStore] get all Tickets',
  CREATE_TICKET: '[DataStore] create Ticket',
  UPDATE_TICKET: '[DataStore] update lutilisateur dans le store',
  DELETE_TICKET: '[DataStore] delete Ticket',
  SAVE_TICKET: '[DataStore] enregistre lutilisateur dans le store',
  SAVE_TICKETS: '[DataStore] save all Tickets',

  CRUD_OPERATION_SUCCESS: '[DataStore] crud operation success',

};

// **** Ticket ****
export const crudOperationSuccess = createAction('[CRUD] Operation Success');

export const getTicket = createAction(action.GET_TICKET, props<{ payload: number, displayInSidebar?: boolean }>());
export const saveTicket = createAction(action.SAVE_TICKET, props<{ payload: Ticket }>());
export const createTicket = createAction(action.CREATE_TICKET, props<{ payload: Ticket }>());
export const updateTicket = createAction(action.UPDATE_TICKET, props<{ payload: Partial<Ticket> }>());
export const deleteTicket = createAction(action.DELETE_TICKET, props<{ payload: number }>());
export const getTickets = createAction(action.GET_TICKETS);
export const saveTickets = createAction(action.SAVE_TICKETS, props<{ payload: Ticket[] }>());


export function getTicketToDisplay(getTicketToDisplay: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
  throw new Error("Function not implemented.");
}
