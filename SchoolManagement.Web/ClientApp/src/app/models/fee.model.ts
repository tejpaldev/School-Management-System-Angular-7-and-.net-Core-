import { Guid } from "guid-typescript";

export interface Fee {
  Id?: Guid;
  StudentId: Guid;
  FeeDate: Date;
  IsPaid: boolean;
  FeeTypeId: Guid;
  Amount: number;
  Fine: number;
  Discount: number;
  Comment: string;
  PaymentModeId: Guid;
  TransactionNo: string;
  CheckNumber: number;
  ClearenceDate: Date;
}
