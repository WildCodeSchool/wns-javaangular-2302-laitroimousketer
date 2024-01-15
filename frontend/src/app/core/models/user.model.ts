import { Address } from "./address.model";
import { Media } from "./media.model";
import { Role } from "./role.model";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  roleTitle: string;
  address: Address;
  addressId: number;
  media: Media;
}
