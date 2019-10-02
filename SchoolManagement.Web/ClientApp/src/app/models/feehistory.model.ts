import { Guid } from "guid-typescript";

export interface Feehistory {
  Id?: Guid;
  StudentId: Guid;
  FeeTypeId: Guid;
  Amount: number;
  Fine?: number;
  FeeDate: Date;
  Comment?: string;
}
