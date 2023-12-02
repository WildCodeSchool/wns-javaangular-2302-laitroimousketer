import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ticketReducer from './ticket.reducer';

export const reducerKey = 'StoreKey';

// interface pour indexation du store
export interface StateDataStore {
  ticketStore: ticketReducer.TicketState;
  // autres stores
}

export const reducers = {
  ticketStore: ticketReducer.reducer,
  // autres stores
};

export const getFeatureState = createFeatureSelector<StateDataStore>(reducerKey);
// pour la sélection d'un store en particulier

export const getTicketState = createSelector(
  getFeatureState, state => state.ticketStore);

export const getTicket = createSelector(
  getTicketState, ticketReducer.getTicket);

export const getTickets = createSelector(
  getTicketState, ticketReducer.getTickets);
