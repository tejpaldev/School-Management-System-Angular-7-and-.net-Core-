import { Guid } from "guid-typescript";

export interface Class {
  Id?: Guid;
  Name: string;
  Code: string;
  Description?: string;
  StatusId: Guid;
  Status?: string;
}

export interface Section {
  Id?: Guid;
  Name: string;
  Description?: string;
  StatusId: Guid;
  Status?: string;
}

export interface Stream {
  Id?: Guid;
  Name: string;
  Description?: string;
  StatusId: Guid;
  Status?: string;
}

export interface ClassSection {
  Id?: Guid;
  ClassId: Guid;
  Class?: string;
  SectionId: Guid;
  Section?: string;
  StatusId: Guid;
  Status?: string;
}

export interface ClassStream {
  Id?: Guid;
  ClassId: Guid;
  Class?: string;
  SectionId?: Guid;
  Section?: string;
  StreamId: Guid;
  Stream?: string;
  StatusId: Guid;
  Status?: string;
}
