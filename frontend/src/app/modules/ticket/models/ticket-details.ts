export interface TicketDetails {
  number: number;
  name: string;
  userFirstName: string;
  userLastName: string;
  description: string;
  priority: string;
  creationDate: string;
  updateDate?: string;
  status: string;
  creator: string;
  developers: string[];
}
