export interface PanelSideBar {
  sidebar: {isOpen:boolean},
  activePage: string | null,
  // panel des tickets
  displayTicketDetails: { isOpen: boolean },
  displayTicketCreate: { isOpen: boolean },
  // panel des contacts
  displayUserDetails: { isOpen: boolean },
  displayActivity: { isOpen: boolean },
  displayUserProfil: { isOpen: boolean },

}