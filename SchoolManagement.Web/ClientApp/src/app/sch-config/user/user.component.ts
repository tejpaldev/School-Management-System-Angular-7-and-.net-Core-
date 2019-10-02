import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { UserManageService } from "../../services/user-manage.service";
import { User } from "../../models/user.model";
import { Role } from "../../models/role.model";
import { RoleService } from "../../services/role.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";

const WORD_REGEX = /^[a-zA-Z0-9]*$/;
const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^[789]\d{9}$/;

@Component({
  selector: "school-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  passwordFormGroup: FormGroup;
  editFormGroup: FormGroup;
  roleList: Array<Role>;
  statusList: Array<Status>;
  userFormGroup: FormGroup;
  password: string = "password";
  private _data = new BehaviorSubject<Option>({
    IsAdd: true,
    IsPassword: false,
    Status: new Array<Status>()
  });

  @Input()
  set option(value) {
    this._data.next(value);
  }

  get option() {
    return this._data.getValue();
  }
  constructor(
    private userService: UserManageService,
    private roleService: RoleService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._data.subscribe(x => {
      this.initUserForm(this.option);
    });
  }

  private initUserForm(option: Option) {
    if (!this.roleList) {
      this.roleService.roles().subscribe(roles => {
        if (roles && roles.length > 0) {
          this.roleList = roles;
        } else {
          this.snackBar.open("Please add role first", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      });
    }
    this.statusList = option.Status;
    if (option.IsAdd) {
      this.userFormGroup = new FormGroup({
        username: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        password: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(PASSWORD_REGEX)
        ]),
        email: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ]),
        contact: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(PHONE_REGEX)
        ]),
        role: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
    } else {
      if (option.IsPassword) {
        this.passwordFormGroup = new FormGroup({
          password: new FormControl({ value: "", disabled: false }, [
            Validators.required,
            Validators.pattern(PASSWORD_REGEX)
          ])
        });
      } else {
        this.editFormGroup = new FormGroup({
          username: new FormControl(
            { value: option.User.Username, disabled: false },
            [Validators.required, Validators.pattern(WORD_REGEX)]
          ),
          email: new FormControl(
            { value: option.User.Email, disabled: false },
            [Validators.required, Validators.pattern(EMAIL_REGEX)]
          ),
          contact: new FormControl(
            { value: option.User.Contact, disabled: false },
            [Validators.required, Validators.pattern(PHONE_REGEX)]
          ),
          role: new FormControl(
            { value: option.User.RoleId, disabled: false },
            [Validators.required]
          )
        });
      }
    }
  }

  /**
   * add
   */
  public add() {
    if (this.userFormGroup.valid) {
      let userModel = this.userFormGroup.value;
      let user = <User>{
        Username: userModel.username,
        Password: userModel.password,
        Email: userModel.email,
        Contact: userModel.contact,
        RoleId: userModel.role,
        StatusId: userModel.status
      };
      this.userService.add(user).subscribe(
        status => {
          if (status) {
            this.snackBar.open("User added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add User", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while adding", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * edit
   */
  public edit() {
    if (this.editFormGroup.valid) {
      let userModel = this.editFormGroup.value;
      let user = <User>{
        Id: this.option.User.Id,
        Username: userModel.username,
        Password: this.option.User.Password,
        Email: userModel.email,
        Contact: userModel.contact,
        RoleId: userModel.role,
        StatusId: this.option.User.StatusId
      };
      this.userService.update(user).subscribe(
        status => {
          if (status) {
            this.snackBar.open("User updated successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to update user", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while updating", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * delete
   */
  public delete() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete User",
        message: "Do you want to delete this user ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService
          .delete(this.option.User.Id)
          .subscribe(status => {
            if(status){
              this.snackBar.open("User deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
            else{
              this.snackBar.open("Not able to delete user", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          }, error => {
            this.snackBar.open("An error occured while deleting", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          });
      }
    });
  }

  /**
   * change
   */
  public change() {
    if (this.passwordFormGroup.valid) {
      let userModel = this.passwordFormGroup.value;
      let user = <User>{
        Id: this.option.User.Id,
        Username: this.option.User.Username,
        Password: userModel.password,
        Email: this.option.User.Email,
        Contact: this.option.User.Contact,
        RoleId: this.option.User.RoleId,
        StatusId: this.option.User.StatusId
      };
      this.userService.update(user).subscribe(status => {}, error => {});
    }
  }
}
