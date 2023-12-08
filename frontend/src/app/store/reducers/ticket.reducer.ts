import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as ticketAction from '../actions/ticket.action';
import { Ticket } from 'src/app/features/ticket/models/ticket';

export interface TicketState extends EntityState<Ticket> { }

export const ticketAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket: Ticket) => ticket.id,
  // Autres options d'adapter si nécessaire
});

const initialState: TicketState = ticketAdapter.getInitialState();

export const Reducer = createReducer(
  initialState,
  on(ticketAction.saveTicket, (state, { payload }) => {
    return ticketAdapter.addOne(payload, state);
  }),
  on(ticketAction.getTicket, (state) => state), 
  on(ticketAction.getTickets, (state) => state), 

  on(ticketAction.saveTickets, (state, { payload }) => {
    return ticketAdapter.setAll(payload, state);
  }),

);

export const {
  selectAll: selectAllTickets,
  selectIds: selectTicketIds,
  selectEntities: selectTicketEntities,
  selectTotal: selectTotalTickets,
} = ticketAdapter.getSelectors();

