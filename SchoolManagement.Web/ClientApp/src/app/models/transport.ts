import { Guid } from "guid-typescript";

export interface Location {
  Id?: Guid;
  Name: string;
  Description: string;
}

export interface Busroute {
  Id?: Guid;
  Name: string;
  LocationId: Guid;
  Description: string;
}
