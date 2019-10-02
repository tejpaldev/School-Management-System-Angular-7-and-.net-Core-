import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";

import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { Busroute, Location } from "../../models/transport";
import { MasterDataService } from "../../services/master-data.service";
import { TransportService } from "../../services/transport.service";

const WORD_REGEX = /^[a-zA-Z0-9]*$/;

@Component({
  selector: "school-bus-config",
  templateUrl: "./bus-config.component.html",
  styleUrls: ["./bus-config.component.scss"]
})
export class BusConfigComponent implements OnInit {
  locationSearchForm: FormGroup;
  busrouteSearchForm: FormGroup;
  locationOption: Option;
  busrouteOption: Option;
  isLocationEdit: boolean;
  isBusrouteEdit: boolean;
  isLocation: boolean;
  isBusroute: boolean;
  statusList: Array<Status>;

  constructor(
    private masterDataService: MasterDataService,
    private transportService: TransportService,
    public snackBar: MatSnackBar
  ) {
    this.masterDataService.status().subscribe(
      status => {
        this.statusList = status;
      },
      error => {
        this.snackBar.open("An error occured while getting status", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.isLocation = false;
    this.isLocationEdit = false;
    this.isBusroute = false;
    this.isBusrouteEdit = false;
  }

  ngOnInit() {}

  /**
   * addLocation
   */
  public addLocation() {
    this.locationOption = <Option>{
      IsAdd: true,
      Status: this.statusList
    };
    this.isLocation = true;
    this.isLocationEdit = false;
    this.isBusroute = false;
    this.isBusrouteEdit = false;
  }

  /**
   * editLocationSearch
   */
  public editLocationSearch() {
    this.locationSearchForm = new FormGroup({
      locationname: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ])
    });
    this.isLocation = false;
    this.isLocationEdit = true;
    this.isBusroute = false;
    this.isBusrouteEdit = false;
  }

  /**
   * editLocation
   */
  public editLocation() {
    if (this.locationSearchForm.valid) {
      let searchModel = this.locationSearchForm.value;
      let location = <Location>{
        Name: searchModel.locationname
      };
      this.transportService.searchlocation(location).subscribe(
        location => {
          if (location) {
            this.locationOption = <Option>{
              IsAdd: false,
              Status: this.statusList,
              Location: location
            };
            this.isLocation = true;
            this.isLocationEdit = true;
            this.isBusroute = false;
            this.isBusrouteEdit = false;
          } else {
            this.snackBar.open("No location matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching location", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * addBusroute
   */
  public addBusroute() {
    this.busrouteOption = <Option>{
      IsAdd: true,
      Status: this.statusList
    };
    this.isLocation = false;
    this.isLocationEdit = false;
    this.isBusroute = true;
    this.isBusrouteEdit = false;
  }

  /**
   * editBusrouteSearch
   */
  public editBusrouteSearch() {
    this.busrouteSearchForm = new FormGroup({
      busroutename: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ])
    });
    this.isLocation = false;
    this.isLocationEdit = false;
    this.isBusroute = false;
    this.isBusrouteEdit = true;
  }

  /**
   * editBusroute
   */
  public editBusroute() {
    if (this.busrouteSearchForm.valid) {
      let searchModel = this.busrouteSearchForm.value;
      let busroute = <Busroute>{
        Name: searchModel.busroutename
      };
      this.transportService.searchbus(busroute).subscribe(
        busroute => {
          if (busroute) {
            this.busrouteOption = <Option>{
              IsAdd: false,
              Status: this.statusList,
              Busroute: busroute
            };
            this.isLocation = false;
            this.isLocationEdit = false;
            this.isBusroute = true;
            this.isBusrouteEdit = true;
          } else {
            this.snackBar.open("No bus route matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching bus route", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }
}
