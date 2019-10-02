import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

import { Option } from "../../models/option-role.model";
import { Role } from "../../models/role.model";
import { Status } from "../../models/status.model";
import { RoleService } from "../../services/role.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";

const WORD_REGEX = /^[A-z]+$/;

@Component({
  selector: "school-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"]
})
export class RoleComponent implements OnInit {
  editFormGroup: FormGroup;
  statusList: Array<Status>;
  roleFormGroup: FormGroup;
  private _data = new BehaviorSubject<Option>({
    IsAdd: true,
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
    private roleService: RoleService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._data.subscribe(x => {
      this.initRoleForm(this.option);
    });
  }

  initRoleForm(option: Option): any {
    this.statusList = option.Status;
    if (option.IsAdd) {
      this.roleFormGroup = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        description: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(WORD_REGEX)
        ]),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
    } else {
      this.editFormGroup = new FormGroup({
        name: new FormControl({ value: option.Role.Name, disabled: true }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        description: new FormControl(
          { value: option.Role.Description, disabled: true },
          [Validators.pattern(WORD_REGEX)]
        )
      });
    }
  }

  /**
   * add
   */
  public add() {
    if (this.roleFormGroup.valid) {
      let roleModel = this.roleFormGroup.value;
      let role = <Role>{
        Name: roleModel.name,
        Description: roleModel.description,
        StatusId: roleModel.status
      };
      this.roleService.add(role).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Role added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add role", "", {
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
   * delete
   */
  public delete() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Role",
        message: "Do you want to delete this role ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleService.delete(this.option.Role.Id).subscribe(
          status => {
            if (status) {
              this.snackBar.open("Role deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete role", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while deleting", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        );
      }
    });
  }
}
