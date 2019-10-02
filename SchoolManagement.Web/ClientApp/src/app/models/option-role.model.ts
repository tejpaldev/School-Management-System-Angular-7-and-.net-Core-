import { Feetype } from "./feetype.model";
import { Location, Busroute } from "./transport";
import { Status } from "./status.model";
import { Role } from "./role.model";
import { User } from "./user.model";

export interface Option {
  IsAdd: boolean;
  IsEdit?: boolean;
  IsDelete?: boolean;
  IsPassword?: boolean;
  Status?: Array<Status>;
  User?: User;
  Role?: Role;
  Location?: Location;
  Busroute?: Busroute;
  Feetype?: Feetype;
  Type?:string;
}
