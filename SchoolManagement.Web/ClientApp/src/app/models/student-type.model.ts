import { Guid } from "guid-typescript";

export interface StudentType {
  Id: Guid;
  Name: string;
  Description: string;
  StatusId: Guid;
  Status: string;
}
