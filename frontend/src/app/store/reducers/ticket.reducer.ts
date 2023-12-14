import { ActionReducer, Action } from '@ngrx/store';
import * as ticketAction from '../actions/ticket.action';
import { Ticket } from 'src/app/features/ticket/models/ticket';

export interface TicketState {
  ticket: Ticket;
  tickets: Ticket[];

}

const initialState: TicketState = {
  ticket: {} as Ticket,
  tickets: [] as Ticket[],
};

export function reducer(state = initialState, action: Action & { payload?: any }) {
  switch (action.type) {

    case ticketAction.action.SAVE_TICKET: {
      return {
        ...state,
        ticket: action.payload,
      };
    }

    case ticketAction.action.GET_TICKET: {
      return {
        ...state,
        ticket: action.payload,
      };
    }

    case ticketAction.action.GET_TICKETS: {
      return {
        ...state,
        tickets: action.payload,
      };
    }
    case ticketAction.action.SAVE_TICKETS: {
      return {
        ...state,
        tickets: action.payload,
      };
    };

    default:
      return state;
  }
}


export const selectTicket = (state: TicketState) => state.ticket;
export const selectTickets = (state: TicketState) => state.tickets;
