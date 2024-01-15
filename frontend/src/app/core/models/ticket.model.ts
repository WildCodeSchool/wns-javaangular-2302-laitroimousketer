import { User } from "src/app/core/models/user.model";
import { Status } from "./status.model";
import { Category } from "./category.model";
import { TicketHaveUsers } from "./ticket-have-users.model";
import { Priority } from "./priority.model";

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
  author: User | null;
}
