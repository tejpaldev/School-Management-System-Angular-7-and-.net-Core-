import { Guid } from "guid-typescript";

export interface ClassFee {
  Id?: Guid;
  FeeAmount: number;
  FineAmount?: number;
  DiscountAmount?: number;
  FeeDueDate: Date;
  Description?: string;
  ClassId: Guid;
  Class: string;
  FeeTypeId: Guid;
  FeeType: string;
  StatusId: Guid;
  Status: string;
}
