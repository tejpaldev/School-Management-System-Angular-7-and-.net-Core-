import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Option } from "../../models/option-role.model";
import { Role } from "../../models/role.model";
import { UserManageService } from "../../services/user-manage.service";
import { Status } from "../../models/status.model";
import { MasterDataService } from "../../services/master-data.service";
import { RoleService } from "../../services/role.service";
import { User } from "../../models/user.model";
import { MatSnackBar } from "@angular/material";

const WORD_REGEX = /^[a-zA-Z0-9]*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^[789]\d{9}$/;

@Component({
  selector: "school-user-config",
  templateUrl: "./user-config.component.html",
  styleUrls: ["./user-config.component.scss"]
})
export class UserConfigComponent implements OnInit {
  roleSearchForm: FormGroup;
  userSearchForm: FormGroup;
  roleOption: Option;
  userOption: Option;
  isUserEdit: boolean;
  isUser: boolean;
  isRoleEdit: boolean;
  isRole: boolean;
  isPasswordChange: boolean;
  statusList: Array<Status>;
  constructor(
    private masterDataService: MasterDataService,
    private roleService: RoleService,
    private userService: UserManageService,
    public snackBar: MatSnackBar
  ) {
    this.masterDataService.status().subscribe(status => {
      this.statusList = status;
    });
    this.isPasswordChange = false;
    this.isUser = false;
    this.isUserEdit = false;
    this.isRole = false;
    this.isRoleEdit = false;
  }

  ngOnInit() {}

  /**
   * addUser
   */
  public addUser() {
    this.userOption = <Option>{
      IsAdd: true,
      IsPassword: false,
      Status: this.statusList
    };
    this.isRole = false;
    this.isRoleEdit = false;
    this.isUserEdit = false;
    this.isUser = true;
  }

  /**
   * editUserSearch
   */
  public editUserSearch() {
    this.userSearchForm = new FormGroup(
      {
        username: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(WORD_REGEX)
        ]),
        email: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(EMAIL_REGEX)
        ]),
        contact: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(PHONE_REGEX)
        ])
      },
      (formGroup: FormGroup) => {
        return this.validateSearch(formGroup);
      }
    );
    this.isPasswordChange = false;
    this.isUser = false;
    this.isUserEdit = true;
    this.isRole = false;
    this.isRoleEdit = false;
  }

  private validateSearch(formGroup: FormGroup) {
    const username = formGroup.controls["username"];
    const email = formGroup.controls["email"];
    const contact = formGroup.controls["contact"];
    if (
      username.value.length > 0 ||
      email.value.length > 0 ||
      contact.value.length > 0
    )
      return null;
    return {
      validateSearch: {
        valid: false
      }
    };
  }

  /**
   * editUser
   */
  public editUser() {
    if (this.userSearchForm.valid) {
      let searchModel = this.userSearchForm.value;
      let user = <User>{
        Username: searchModel.username,
        Email: searchModel.email,
        Contact: searchModel.contact
      };
      this.userService.search(user).subscribe(
        user => {
          if (user) {
            if (this.isPasswordChange) {
              this.userOption = <Option>{
                IsAdd: false,
                IsPassword: true,
                Status: this.statusList,
                User: user
              };
            } else {
              this.userOption = <Option>{
                IsAdd: false,
                IsPassword: false,
                Status: this.statusList,
                User: user
              };
            }
            this.isRole = false;
            this.isRoleEdit = false;
            this.isUserEdit = true;
            this.isUser = true;
          } else {
            this.snackBar.open("No user matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching user", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * editPassword
   */
  public editPassword() {
    this.editUserSearch();
    this.isPasswordChange = true;
  }

  /**
   * addRole
   */
  public addRole() {
    this.roleOption = <Option>{
      IsAdd: true,
      Status: this.statusList
    };
    this.isUser = false;
    this.isUserEdit = false;
    this.isRole = true;
    this.isRoleEdit = false;
  }

  /**
   * editRoleSearch
   */
  public editRoleSearch() {
    this.roleSearchForm = new FormGroup({
      rolename: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ])
    });
    this.isUser = false;
    this.isUserEdit = false;
    this.isRoleEdit = true;
    this.isRole = false;
  }

  /**
   * editRole
   */
  public editRole() {
    if (this.roleSearchForm.valid) {
      let searchModel = this.roleSearchForm.value;
      let role = <Role>{
        Name: searchModel.rolename
      };
      this.roleService.search(role).subscribe(
        role => {
          if (role) {
            this.roleOption = <Option>{
              IsAdd: false,
              Status: this.statusList,
              Role: role
            };
            this.isRole = true;
            this.isRoleEdit = true;
            this.isUserEdit = false;
            this.isUser = false;
          } else {
            this.snackBar.open("No role matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching role", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }
}
