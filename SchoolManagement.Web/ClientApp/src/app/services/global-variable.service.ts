import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class GlobalVariableService {
  public tokenKey: string = "token";
  public isAuthenticated: boolean;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.isAuthenticated = false;
  }

  setAthentication(isAuthenticated: boolean): void {
    this.isAuthenticated = isAuthenticated;
    this.isUserLoggedIn.next(isAuthenticated);
  }

  getAuthentication(): boolean {
    return this.isAuthenticated;
  }
}
