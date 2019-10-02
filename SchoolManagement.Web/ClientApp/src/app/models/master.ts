import { Guid } from "guid-typescript";
export interface Gender {
  Id: string;
  Name: string;
}

export interface BloodGroup {
  Id: string;
  Name: string;
}

export interface Religion {
  Id: string;
  Name: string;
}

export interface Category {
  Id: string;
  Name: string;
}

export interface SearchType {
  Id: string;
  Name: string;
}

export interface SearchForm {
  RegistrationNo?: string;
  AdmissionNo?: string;
  ClassId?: Guid;
  StudentName?: string;
  DateofBirth?: Date;
  Contact?: number;
}

export interface ParentType {
  Id: string;
  Name: string;
}
