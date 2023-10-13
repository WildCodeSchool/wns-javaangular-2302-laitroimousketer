import { TicketHaveUsers } from "./ticketHaveUsers";

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
  authorId: number;
  authorFirstname: string;
  authorLastname: string;
  authorEmail: string;
  developers: TicketHaveUsers[];
  fullnameAuthor: string;
}
