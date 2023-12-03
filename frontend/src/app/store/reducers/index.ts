import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ticketReducer from './ticket.reducer';
import * as sidebarReducer from './sidebar.reducer';

export const reducerKey = 'DataStoreKey';

// interface pour indexation du store
export interface StateDataStore {
  ticketStore: ticketReducer.TicketState;
  sidebarStore: sidebarReducer.SideBarState;
  // autres stores
}

export const reducers = {
  ticketStore: ticketReducer.reducer,
  sidebarStore: sidebarReducer.reducer,
  // autres stores
};

export const getFeatureState = createFeatureSelector<StateDataStore>(reducerKey);
// pour la sélection d'un store en particulier

//tickets
export const getTicketState = createSelector(
  getFeatureState, state => state.ticketStore);

export const getTicket = createSelector(
  getTicketState, ticketReducer.getTicket);

export const getTickets = createSelector(
  getTicketState, ticketReducer.getTickets);

export function getReducers() {
  return reducers;
}

// sidebar
export const getSidebarState = createSelector(
  getFeatureState, state => state.sidebarStore);
// panel dans sidebar
export const getPanelState = createSelector(
  getSidebarState, sidebarReducer.getPanel);