import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";
import { BehaviorSubject } from "rxjs";

import { Class } from "../../models/class";
import { ClassFee } from "../../models/classfee.model";
import { Feetype } from "../../models/feetype.model";
import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { MasterDataService } from "../../services/master-data.service";
import { ClassService } from "../../services/class.service";
import { FeeService } from "../../services/fee.service";

@Component({
  selector: "school-classfee",
  templateUrl: "./classfee.component.html",
  styleUrls: ["./classfee.component.scss"]
})
export class ClassfeeComponent implements OnInit {
  classFeeForm: FormGroup;
  classList: Array<Class>;
  feetypeList: Array<Feetype>;
  statusList: Array<Status>;
  isClassfeeEdit: boolean;
  isClassfeeAdd: boolean;
  isClassEditForm: boolean;
  editedClassFee: ClassFee;
  classFeeDataSource = new MatTableDataSource();
  columnsDisplayed = [
    "class",
    "feetype",
    "fee",
    "fine",
    "discount",
    "duedate",
    "description",
    "actionedit",
    "actiondelete"
  ];
  totalLength: number = 0;
  private _data = new BehaviorSubject<Option>({
    IsAdd: true,
    IsDelete: false
  });

  @Input()
  set option(value) {
    this._data.next(value);
  }

  get option() {
    return this._data.getValue();
  }
  constructor(
    private masterDataService: MasterDataService,
    private feeService: FeeService,
    private classService: ClassService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.isClassfeeAdd = false;
    this.isClassfeeEdit = false;
    this.isClassEditForm = false;
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
  }

  ngOnInit() {
    this._data.subscribe(x => {
      this.init(this.option);
    });
  }

  private init(option: Option) {
    if (!this.feetypeList) {
      this.feeService.types().subscribe(
        feetypes => {
          if (feetypes && feetypes.length > 0) {
            this.feetypeList = feetypes;
          } else {
            this.snackBar.open("No fee type available", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting fee type", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
    if (!this.classList) {
      this.classService.class().subscribe(
        classes => {
          if (classes.length > 0) {
            this.classList = classes;
          } else {
            this.snackBar.open("Please add class first", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while fetching", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
    if (option.IsAdd) {
      this.classFeeForm = new FormGroup({
        fee: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(/[0-9]/)
        ]),
        fine: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(/[0-9]/)
        ]),
        discount: new FormControl({ value: "", disabled: false }, [
          Validators.pattern(/[0-9]/)
        ]),
        duedate: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        class: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        feetype: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ]),
        description: new FormControl({ value: "", disabled: false })
      });
      this.isClassfeeAdd = true;
      this.isClassfeeEdit = false;
      this.isClassEditForm = false;
    } else {
      this.feeService.classFee().subscribe(
        classfee => {
          if (classfee && classfee.length > 0) {
            this.classFeeDataSource.data = classfee;
            this.totalLength = classfee.length;
          } else {
            this.classFeeDataSource.data = null;
            this.totalLength = 0;
            this.snackBar.open("No Class Fee is added", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting Class Fee", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
      this.isClassfeeAdd = false;
      this.isClassfeeEdit = true;
      this.isClassEditForm = false;
    }
  }

  /**
   * addClassfee
   */
  public addClassfee() {
    if (this.classFeeForm.valid) {
      let classFeeModel = this.classFeeForm.value;
      let classFee = <ClassFee>{
        FeeAmount: classFeeModel.fee,
        FineAmount: classFeeModel.fine,
        DiscountAmount: classFeeModel.discount,
        Description: classFeeModel.description,
        FeeDueDate: classFeeModel.duedate,
        ClassId: classFeeModel.class,
        FeeTypeId: classFeeModel.feetype,
        StatusId: classFeeModel.status
      };
      this.feeService.addClassFee(classFee).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Class Fee added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Class Fee adding failed", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while adding Class Fee", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * editclassfee
   */
  public editClassFee() {
    if (this.classFeeForm.valid) {
      let classFeeModel = this.classFeeForm.value;
      let classFee = <ClassFee>{
        Id: this.editedClassFee.Id,
        FeeAmount: classFeeModel.fee,
        FineAmount: classFeeModel.fine,
        DiscountAmount: classFeeModel.discount,
        Description: classFeeModel.description,
        FeeDueDate: classFeeModel.duedate,
        ClassId: this.editedClassFee.ClassId,
        FeeTypeId: this.editedClassFee.FeeTypeId,
        StatusId: this.editedClassFee.StatusId
      };
      this.feeService.editClassFee(classFee).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Class Fee edited successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Class Fee editing failed", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while editing Class Fee", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * deleteclassfee
   */
  public deleteClassfee(classFeeId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Class Fee",
        message: "Do you want to delete this Class Fee ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feeService.deleteClassFee(classFeeId).subscribe(
          status => {
            if (status) {
              this.feeService.classFee().subscribe(
                classfee => {
                  if (classfee) {
                    this.classFeeDataSource.data = classfee;
                    this.totalLength = classfee.length;
                  } else {
                    this.classFeeDataSource.data = null;
                    this.totalLength = 0;
                  }
                },
                error => {
                  this.snackBar.open(
                    "An error occured while getting class fee",
                    "",
                    {
                      horizontalPosition: "center",
                      verticalPosition: "top",
                      duration: 2000
                    }
                  );
                }
              );
              this.snackBar.open("Class Fee deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete Class Fee", "", {
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

  /**
   * editForm
   */
  public editForm(classFeeId: Guid) {
    this.feeService.classFeeById(classFeeId).subscribe(
      classfee => {
        if (classfee) {
          this.editedClassFee = classfee;
          this.classFeeForm = new FormGroup({
            id: new FormControl({ value: classfee.Id, disabled: true }),
            fee: new FormControl(
              { value: classfee.FeeAmount, disabled: false },
              [Validators.required, Validators.pattern(/[0-9]/)]
            ),
            fine: new FormControl(
              { value: classfee.FineAmount, disabled: false },
              [Validators.pattern(/[0-9]/)]
            ),
            discount: new FormControl(
              { value: classfee.DiscountAmount, disabled: false },
              [Validators.pattern(/[0-9]/)]
            ),
            duedate: new FormControl(
              { value: classfee.FeeDueDate, disabled: false },
              [Validators.required]
            ),
            class: new FormControl({ value: classfee.ClassId, disabled: true }),
            feetype: new FormControl({
              value: classfee.FeeTypeId,
              disabled: true
            }),
            status: new FormControl({
              value: classfee.StatusId,
              disabled: true
            }),
            description: new FormControl({
              value: classfee.Description,
              disabled: false
            })
          });
          this.isClassfeeAdd = false;
          this.isClassfeeEdit = true;
          this.isClassEditForm = true;
        } else {
          this.snackBar.open("No Class Fee found by this Id", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }
}
