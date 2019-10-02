import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { GlobalVariableService } from "../services/global-variable.service";

@Injectable()
export class SchoolGuard implements CanActivate {
  public tokenKey: string = "token";
  constructor(
    private router: Router,
    private globalVar: GlobalVariableService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let storedToken: string = sessionStorage.getItem(this.tokenKey);
    if (storedToken) {
      // logged in so return true
      this.globalVar.setAthentication(true);
      return this.globalVar.isAuthenticated;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/user/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
      // this.globalVar.setAthentication(true);
      // return this.globalVar.isAuthenticated;
    }
  }
}
