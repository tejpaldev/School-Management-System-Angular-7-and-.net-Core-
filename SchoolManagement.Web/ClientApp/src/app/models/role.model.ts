import { Guid } from "guid-typescript";

export interface Role {
  Id?: Guid;
  Name: string;
  Description: string;
  StatusId: Guid;
  Status: string;
}
