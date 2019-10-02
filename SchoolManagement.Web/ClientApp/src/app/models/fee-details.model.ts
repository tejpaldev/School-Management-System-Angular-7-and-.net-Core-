import { Fee } from "./fee.model";
export interface FeeDetails {
  Previous: Array<Fee>;
  Current: Array<Fee>;
}
