import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ticketReducer from './ticket.reducer';
import * as sidebarReducer from './sidebar.reducer';
import { SideBarState } from './sidebar.reducer';
import { ticketAdapter, TicketState } from './ticket.reducer';
export const reducerKey = 'DataStoreKey';

// interface pour indexation du store
export interface StateDataStore {
  ticketStore: ticketReducer.TicketState;
  sidebarStore: sidebarReducer.SideBarState;
  // autres stores
}
export const getTicketState = createFeatureSelector<TicketState>('ticketStore');
export const getSidebarState = createFeatureSelector<SideBarState>('sidebarStore');
export const reducers = {
  ticketStore: ticketReducer.Reducer,
  sidebarStore: sidebarReducer.reducer,
  // autres stores
};


//tickets
export const selectAllTickets = createSelector(
  getTicketState,

  ticketAdapter.getSelectors().selectAll
);
export const selectTicketById = (ticketId: number) => createSelector(
  getTicketState,
  (state: TicketState) => state.entities ? state.entities[ticketId] : null
);



// sidebar

// panel dans sidebar
export const getPanelState = createSelector(
  getSidebarState, sidebarReducer.getPanel);



  export function getReducers() {
    return reducers;
  }