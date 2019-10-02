import { Guid } from "guid-typescript";
export interface ReportFilter {
  FromDate?: Date;
  ToDate?: Date;
  Session?: number;
  ClassIds?: Array<Guid>;
  SectionIds?: Array<Guid>;
  FeeTypeIds?: Array<Guid>;
  ClassId?: Guid;
  SectionId?: Guid;
  FeeTypeId?: Guid;
  StudentName?: string;
  AdmissionNo?: string;
}
