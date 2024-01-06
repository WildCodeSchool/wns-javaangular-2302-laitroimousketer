import { User } from "src/app/core/models/user.model";
import { Priority } from "./Priority";
import { Status } from "./Status";
import { Category } from "./category";
import { TicketHaveUsers } from "./ticketHaveUsers";

export class Ticket {
  public id: number = 0
  public ticketTitle: string = ''
  public description: string = ''
  public category!: Category
  public status!: Status
  public priority!: Priority
  public creationDate: string = ''
  public updateDate: string = ''
  public archiveDate: string | null = ''
  public ticketHaveUsers : TicketHaveUsers[] = [];
  public author! : User
}
