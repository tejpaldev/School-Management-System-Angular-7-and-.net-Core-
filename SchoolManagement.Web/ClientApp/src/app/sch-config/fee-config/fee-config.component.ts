import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar, MatTableDataSource } from "@angular/material";

import { Status } from "../../models/status.model";
import { MasterDataService } from "../../services/master-data.service";
import { Feetype } from "../../models/feetype.model";
import { Option } from "../../models/option-role.model";
import { FeeService } from "../../services/fee.service";

const WORD_REGEX = /^[a-zA-Z]*$/;

@Component({
  selector: "school-fee-config",
  templateUrl: "./fee-config.component.html",
  styleUrls: ["./fee-config.component.scss"]
})
export class FeeConfigComponent implements OnInit {
  classfeeOption: Option;
  feetypeSearchForm: FormGroup;
  feetypeOption: Option;
  isFeetypeEdit: boolean;
  isFeetype: boolean;
  isClassfee: boolean;
  statusList: Array<Status>;
  constructor(
    private masterDataService: MasterDataService,
    private feeService: FeeService,
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
    this.isFeetype = false;
    this.isFeetypeEdit = false;
    this.isClassfee = false;
  }

  ngOnInit() {}

  /**
   * add Feetype
   */
  public addFeetype() {
    this.feetypeOption = <Option>{
      IsAdd: true,
      IsDelete: false,
      Status: this.statusList
    };
    this.isFeetype = true;
    this.isClassfee = false;
    //this.isFeetypeEdit = false;
  }

  /**
   * delete Feetype
   */
  public deleteFeetype() {
    this.feetypeOption = <Option>{
      IsAdd: false,
      IsDelete: true,
      Status: this.statusList
    };
    this.isFeetype = true;
    this.isClassfee = false;
    //this.isFeetypeEdit = false;
  }

  /**
   * addClassFee
   */
  public addClassFee() {
    this.classfeeOption = <Option>{
      IsAdd: true,
      IsDelete: false
    };
    this.isFeetype = false;
    this.isClassfee = true;
  }

  /**
   * editClassFee
   */
  public editClassFee() {
    this.classfeeOption = <Option>{
      IsAdd: false,
      IsDelete: false
    };
    this.isFeetype = false;
    this.isClassfee = true;
  }

  /**
   * deleteClassFee
   */
  public deleteClassFee() {
    this.classfeeOption = <Option>{
      IsAdd: false,
      IsDelete: true
    };
    this.isFeetype = false;
    this.isClassfee = true;
  }

  /**Start - Method Not in use*/
  /**
   * edit FeeTypeSearch
   */
  public editFeetypeSearch() {
    this.feetypeSearchForm = new FormGroup({
      name: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ])
    });
    this.isFeetype = false;
    this.isFeetypeEdit = true;
  }

  /**
   * edit Feetype
   */
  public editFeetype() {
    if (this.feetypeSearchForm.valid) {
      let searchModel = this.feetypeSearchForm.value;
      let feetype = <Feetype>{
        Name: searchModel.name
      };
      this.feeService.searchFeetype(feetype).subscribe(
        feetype => {
          if (feetype) {
            this.feetypeOption = <Option>{
              IsAdd: false,
              Status: this.statusList,
              Feetype: feetype
            };
            this.isFeetype = true;
            this.isFeetypeEdit = true;
          } else {
            this.snackBar.open("No Feetype matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching feetype", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }
  /**End - Method Not in use*/
}
