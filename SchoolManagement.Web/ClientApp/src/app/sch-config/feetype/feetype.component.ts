import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { BehaviorSubject } from "rxjs";

import { Feeperiod } from "../../models/feeperiod.model";
import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { FeeService } from "../../services/fee.service";
import { Feetype } from "../../models/feetype.model";
import { Guid } from "guid-typescript";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";

const WORD_REGEX = /^[a-zA-Z]*$/;

@Component({
  selector: "school-feetype",
  templateUrl: "./feetype.component.html",
  styleUrls: ["./feetype.component.scss"]
})
export class FeetypeComponent implements OnInit {
  private _data = new BehaviorSubject<Option>({
    IsAdd: true,
    IsDelete: false,
    Status: new Array<Status>()
  });

  @Input()
  set option(value) {
    this._data.next(value);
  }

  get option() {
    return this._data.getValue();
  }

  feetypeAddForm: FormGroup;
  feeperiodList: Array<Feeperiod>;
  statusList: Array<Status>;
  feetypeList: Array<Feetype>;
  feetypeSource = new MatTableDataSource<Feetype>();
  columnsDisplayed = ["name", "description", "period", "action"];
  totalLength: number = 0;
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private feeService: FeeService
  ) {}

  ngOnInit() {
    this._data.subscribe(x => {
      this.init(this.option);
    });
  }

  init(option: Option): any {
    if (option.IsAdd) {
      this.statusList = option.Status;
      if (!this.feeperiodList) {
        this.feeService.feeperiod().subscribe(
          feeperiod => {
            if (feeperiod) {
              this.feeperiodList = feeperiod;
            } else {
              this.snackBar.open("No fee period available", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open(
              "An error occured while getting fee period",
              "",
              {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              }
            );
          }
        );
        this.feetypeAddForm = new FormGroup({
          name: new FormControl({ value: "", disabled: false }, [
            Validators.required,
            Validators.pattern(WORD_REGEX)
          ]),
          description: new FormControl({ value: "", disabled: false }),
          feeperiod: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ]),
          status: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ])
        });
      }
    }
    if (option.IsDelete) {
      this.feeService.types().subscribe(
        feetypes => {
          if (feetypes) {
            this.feetypeList = feetypes;
            this.feetypeSource.data = feetypes;
            this.totalLength = this.feetypeList.length;
          } else {
            this.snackBar.open("No fee type available", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting fee period", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * add
   */
  public add() {
    if (this.feetypeAddForm.valid) {
      let feetypeModel = this.feetypeAddForm.value;
      let feetype = <Feetype>{
        Name: feetypeModel.name,
        Description: feetypeModel.description,
        FeePeriodId: feetypeModel.feeperiod,
        StatusId: feetypeModel.status
      };
      this.feeService.addtype(feetype).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Feetype added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Feetype", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while adding Feetype", "", {
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
  public delete(feetypeId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Feetype",
        message: "Do you want to delete this Feetype ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feeService.deletetype(feetypeId).subscribe(
          status => {
            if (status) {
              this.feeService.types().subscribe(
                feetypes => {
                  if (feetypes) {
                    this.feetypeList = feetypes;
                    this.feetypeSource.data = feetypes;
                    this.totalLength = this.feetypeList.length;
                  } else {
                    this.feetypeSource.data = null;
                    this.totalLength = 0;
                  }
                },
                error => {
                  this.snackBar.open(
                    "An error occured while getting fee type",
                    "",
                    {
                      horizontalPosition: "center",
                      verticalPosition: "top",
                      duration: 2000
                    }
                  );
                }
              );
              this.snackBar.open("Feetype deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete Feetype", "", {
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
