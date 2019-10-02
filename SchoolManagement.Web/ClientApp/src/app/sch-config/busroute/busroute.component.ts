import { Busroute } from "../../models/transport";
import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { BehaviorSubject } from "rxjs";

import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { TransportService } from "../../services/transport.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { Location } from "../../models/transport";

const WORD_REGEX = /^[a-zA-Z0-9]*$/;

@Component({
  selector: "school-busroute",
  templateUrl: "./busroute.component.html",
  styleUrls: ["./busroute.component.scss"]
})
export class BusrouteComponent implements OnInit {
  locationList: Array<Location>;
  busrouteAddForm: FormGroup;
  busrouteEditForm: FormGroup;
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
    if (!this.locationList) {
      this.transportService.location().subscribe(location => {
        if (location && location.length > 0) {
          this.locationList = location;
        } else {
          this.snackBar.open("Please add location first", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      });
    }
    this.statusList = option.Status;
    if (option.IsAdd) {
      this.busrouteAddForm = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(WORD_REGEX)
        ]),
        description: new FormControl({ value: "", disabled: false }),
        location: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
    } else {
      this.busrouteEditForm = new FormGroup({
        name: new FormControl(
          { value: option.Busroute.Name, disabled: false },
          [Validators.required, Validators.pattern(WORD_REGEX)]
        ),
        description: new FormControl({
          value: option.Busroute.Description,
          disabled: false
        }),
        location: new FormControl(
          { value: option.Busroute.LocationId, disabled: false },
          [Validators.required]
        )
      });
    }
  }

  /**
   * add
   */
  public add() {
    if (this.busrouteAddForm.valid) {
      let busrouteModel = this.busrouteAddForm.value;
      let busroute = <Busroute>{
        Name: busrouteModel.name,
        Description: busrouteModel.description,
        LocationId: busrouteModel.location,
        StatusId: busrouteModel.status
      };
      this.transportService.addbusroute(busroute).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Bus route added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add bus route", "", {
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
    if (this.busrouteEditForm.valid) {
      let busrouteModel = this.busrouteEditForm.value;
      let busroute = <Busroute>{
        Id: this.option.Busroute.Id,
        Name: busrouteModel.name,
        Description: busrouteModel.description,
        LocationId: busrouteModel.location
      };
      this.transportService.editbusroute(busroute).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Bus route updated successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to update bus route", "", {
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
        name: "Delete Bus Route",
        message: "Do you want to delete this bus route ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transportService.deletebusroute(this.option.Busroute.Id).subscribe(
          status => {
            if (status) {
              this.snackBar.open("Bus route deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete bus route", "", {
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
