import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { User } from "../../models/user";
import { GlobalVariableService } from "../../services/global-variable.service";
import { UserService } from "../services/user.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "school-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: User = new User("", "", "", "", "");
  public loginForm: FormGroup;
  public errorMsg: string;
  private returnUrl: string;
  public hide: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalVar: GlobalVariableService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {
    this.hide = true;
    this.loginForm = new FormGroup({
      username: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      password: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    let url = this.route.snapshot.queryParams["returnUrl"];
    if (url) this.returnUrl = url;
    else this.returnUrl = "/";
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = this.loginForm.value;
      let user = <User>{
        Username: loginModel.username,
        Password: loginModel.password
      };
      this.authService.generateToken(user.Username, user.Password).subscribe(
        token => {
          if (token) {
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          this.errorMsg = error;
        }
      );
    }
  }
}
