import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ticketReducer from './ticket.reducer';
import * as sidebarReducer from './sidebar.reducer';
import * as userReducer from './user.reducer';

export const reducerKey = 'DataStoreKey';

// interface pour indexation du store
export interface StateDataStore {
  ticketStore: ticketReducer.TicketState;
  sidebarStore: sidebarReducer.SideBarState;
  userStore: userReducer.UserState;
  // autres stores
}

export const reducers = {
  ticketStore: ticketReducer.reducer,
  sidebarStore: sidebarReducer.reducer,
  userStore: userReducer.reducer,
  // autres stores
};

export const getFeatureState = createFeatureSelector<StateDataStore>(reducerKey);
// pour la sélection d'un store en particulier

//tickets
export const getTicketState = createSelector(
  getFeatureState, state => state.ticketStore);

export const getTicket = createSelector(
  getTicketState, ticketReducer.selectTicket);

export const getTickets = createSelector(
  getTicketState, ticketReducer.selectTickets);

export function getReducers() {
  return reducers;
}

// sidebar
export const getSidebarState = createSelector(
  getFeatureState, state => state.sidebarStore);
// panel dans sidebar

export const getPanelState = createSelector(
  getSidebarState, sidebarReducer.getPanel);

// user
export const getUserState = createSelector(
  getFeatureState, state => state.userStore);

export const getUser = createSelector(
  getUserState, userReducer.selectUser);

export const getUsers = createSelector(
  getUserState, userReducer.selectUsers);

export const getUserConnected = createSelector(
  getUserState, userReducer.selectUserConnected);
