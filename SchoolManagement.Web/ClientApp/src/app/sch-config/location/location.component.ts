import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar } from "@angular/material";
import { BehaviorSubject } from "rxjs";

import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { TransportService } from "../../services/transport.service";
import { Location } from "../../models/transport";

const WORD_REGEX = /^[a-zA-Z0-9]*$/;

@Component({
  selector: "school-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"]
})
export class LocationComponent implements OnInit {
  editFormGroup: FormGroup;
  locationFormGroup: FormGroup;
  statusList: Array<Status>;
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
    private transportService: TransportService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this._data.subscribe(x => {
      this.initLocationForm(this.option);
    });
  }

  private initLocationForm(option: Option) {
    this.statusList = option.Status;
    if (option.IsAdd) {
      this.locationFormGroup = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        description: new FormControl({ value: "", disabled: false }),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
    } else {
      this.editFormGroup = new FormGroup({
        name: new FormControl({ value: option.Location.Name, disabled: false }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        description: new FormControl({
          value: option.Location.Description,
          disabled: false
        })
      });
    }
  }

  /**
   * add
   */
  public add() {
    if (this.locationFormGroup.valid) {
      let locationModel = this.locationFormGroup.value;
      let location = <Location>{
        Name: locationModel.name,
        Description: locationModel.description,
        StatusId: locationModel.status
      };
      this.transportService.addlocation(location).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Location added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add location", "", {
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
      let locationModel = this.editFormGroup.value;
      let location = <Location>{
        Id: this.option.Location.Id,
        Name: locationModel.name,
        Description: locationModel.description
      };
      this.transportService.editlocation(location).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Location updated successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to update location", "", {
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
        name: "Delete Location",
        message: "Do you want to delete this location ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transportService.deletelocation(this.option.Location.Id).subscribe(
          status => {
            if (status) {
              this.snackBar.open("Location deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete location", "", {
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
