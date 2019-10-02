import { Guid } from "guid-typescript";

export interface User {
  Id: Guid;
  Username: string;
  Password: string;
  Email: string;
  Contact: string;
  StatusId: Guid;
  RoleId: Guid;
}
