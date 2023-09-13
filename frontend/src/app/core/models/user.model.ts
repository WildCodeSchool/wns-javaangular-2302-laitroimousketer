import { Role } from "./role.model";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role
}
