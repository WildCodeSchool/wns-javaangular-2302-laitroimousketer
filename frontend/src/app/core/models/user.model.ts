import { Address } from "./address.model";
import { Role } from "./role.model";

export class User {
  public id: number = 0;
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public phone: string = '';
  private password: string = '';
  public role!: Role;
  public roleTitle: string = '';
  public address!: Address;
  public addressId: number = 0;
}
