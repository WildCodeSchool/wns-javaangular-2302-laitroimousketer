import { User } from "src/app/core/models/user.model";
import { Priority } from "./Priority";
import { Status } from "./Status";
import { Category } from "./category";
import { TicketHaveUsers } from "./ticketHaveUsers";

export interface Ticket {
  id: number;
  ticketTitle: string;
  description: string;
  category?: Category;
  status?: Status;
  priority?: Priority;
  creationDate: string;
  updateDate: string;
  archiveDate: string | null;
  ticketHaveUsers: TicketHaveUsers[];
  author?: User;
}
