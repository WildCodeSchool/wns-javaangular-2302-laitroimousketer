import { Action } from '@ngrx/store';
import * as sidebarAtion from '../actions/sidebar.action';
import { PanelSideBar } from '../models/sidebar';


export interface SideBarState {
  // etat de chaque sideBar
  panel: PanelSideBar;

}
const initPanel: PanelSideBar = {
  sidebar: { isOpen: false },
  displayTicketDetails: { isOpen: false },
  displayTicketCreate: { isOpen: false },
  displayUserDetails: { isOpen: false },
  displayActivity: { isOpen: false },
}



const initialState: SideBarState = {
  panel: initPanel,
};


export function initPanelElement(state: SideBarState): SideBarState {
  const newPanel: PanelSideBar = {
    sidebar: { isOpen: false },
    displayTicketDetails: { isOpen: false },
    displayTicketCreate: { isOpen: false },
    displayUserDetails: { isOpen: false },
    displayActivity: { isOpen: false },
  };

  return {
    panel: newPanel,
  };
}


export function reducer(state = initialState, action: Action & { payload?: any }) {

  switch (action.type) {
    // reset
    case sidebarAtion.action.RESET_SIDE_BAR: {
      let modifyState: SideBarState = initPanelElement(state);
      return modifyState;
    }
    // display ticket details
    case sidebarAtion.action.DISPLAY_TICKET_DETAILS: {
      let modifyPanel = initPanelElement(state).panel;
      modifyPanel.sidebar.isOpen = true;
      modifyPanel.displayTicketDetails.isOpen = true;
      return {
        ...state,
        panel: modifyPanel,
      };
    }
    // display ticket create
    case sidebarAtion.action.DISPLAY_TICKET_CREATE: {
      let modifyPanel = initPanelElement(state).panel;
      modifyPanel.sidebar.isOpen = true;
      modifyPanel.displayTicketCreate.isOpen = true;
      return {
        ...state,
        panel: modifyPanel,
      };
    }
    case sidebarAtion.action.DISPLAY_USER_DETAILS: {
      let modifyPanel = initPanelElement(state).panel;
      modifyPanel.sidebar.isOpen = true;
      modifyPanel.displayUserDetails.isOpen = true;

      return {
        ...state,
        panel: modifyPanel,
      };
    }
  

    case sidebarAtion.action.DISPLAY_ACTIVITY: {
      let modifyPanel = initPanelElement(state).panel;
      modifyPanel.sidebar.isOpen = true;
      modifyPanel.displayActivity.isOpen = true;

      return {
        ...state,
        panel: modifyPanel,
      };
    }

    default:
      return state;
  }
}


export const getPanel = (state: SideBarState) => state.panel;
