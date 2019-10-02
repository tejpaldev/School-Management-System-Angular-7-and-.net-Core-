import { Guid } from "guid-typescript";

export interface Feetype {
  Id?: Guid;
  Name: string;
  Description: string;
  FeePeriodId: Guid;
  FeePeriod: string;
  StatusId: Guid;
  Status: string;
}
