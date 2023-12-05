import { createAction, props } from '@ngrx/store';

export const action = {
  RESET_SIDE_BAR: '[WindowSideBar] fermeture de tout les panels, et initialisation des options',
  // type des action display des panels
  DISPLAY_TICKET_DETAILS: '[WindowSideBar] sidebar avec panel de détail de ticket',
  DISPLAY_TICKET_CREATE: '[WindowSideBar] sidebar avec panel de création de ticket',
  DISPLAY_USER_DETAILS: '[WindowSideBar] sidebar avec panel de détail de user',
  DISPLAY_ACTIVITY: '[WindowSideBar] sidebar avec panel d\'activité',

};

// reset la sidebar
export const resetSideBar = createAction(action.RESET_SIDE_BAR);
// tickets//
export const displayTicketDetails = createAction(action.DISPLAY_TICKET_DETAILS);
export const displayTicketCreate = createAction(action.DISPLAY_TICKET_CREATE);
// USERs
export const displayUserDetails = createAction(action.DISPLAY_USER_DETAILS);
// activity
export const displayActivity = createAction(action.DISPLAY_ACTIVITY);





