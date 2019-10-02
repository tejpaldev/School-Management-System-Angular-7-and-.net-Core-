import { Guid } from 'guid-typescript';

export interface StudentFeeDiscount {
    Id: Guid,
    StudentTypeId: Guid,
    StudentType: string;
    FeeTypeId: Guid;
    FeeType: string;
    Amount: number;
    StatusId: Guid;
    Status: string;
}
