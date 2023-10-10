import { User } from "src/app/core/models/user.model";
import { Priority } from "./Priority";
import { Status } from "./Status";
import { Category } from "./category";
import { UserHasTickets } from "./userHasTickets";

export class Ticket {
  public id: number = 0
  public ticketTitle: string = ''
  public description: string = ''
  public category: Category = new Category()
  public status: Status = new Status()
  public priority: Priority = new Priority()
  public categoryTitle: string = ''
  public categoryId: number = 0
  public statusTitle: string = ''
  public statusId: number = 0
  public priorityTitle: string = ''
  public priorityId: number = 0
  public creationDate: string = ''
  public updateDate: string = ''
  public userHasTickets : UserHasTickets[] = [];
}

