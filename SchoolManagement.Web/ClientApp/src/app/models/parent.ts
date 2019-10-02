import { Guid } from "guid-typescript";

export interface Parent {
  Id?: Guid;
  StudentId: Guid;
  Name: string;
  Occupation: string;
  ParentTypeId: Guid;
  ParentType: string;
  Address: string;
  Contact: number;
  Email: string;
  IsPrimaryContact: boolean;
}
