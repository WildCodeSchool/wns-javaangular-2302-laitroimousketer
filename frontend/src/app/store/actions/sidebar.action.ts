import { createAction, props } from '@ngrx/store';

export const action = {
  RESET_SIDE_BAR: '[WindowSideBar] reset and close sidebar',
  // type des action display des panels
  DISPLAY_TICKET_DETAILS: '[WindowSideBar] panel ticket-details',
  DISPLAY_TICKET_CREATE: '[WindowSideBar] panel create ticket',
  DISPLAY_USER_DETAILS: '[WindowSideBar] panel user',
  DISPLAY_ACTIVITY: '[WindowSideBar] panel activity',

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





