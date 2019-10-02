import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Status } from '../../models/status.model';
import { StudentFeeDiscount } from '../../models/student-fee-discount';
import { StudentService } from '../../services/student.service';
import { MasterDataService } from '../../services/master-data.service';
import { ConfirmDialogComponent } from '../../sch-shared/confirm-dialog/confirm-dialog.component';
import { FeeService } from '../../services/fee.service';
import { Feetype } from '../../models/feetype.model';
import { StudentType } from '../../models/student-type.model';

@Component({
  selector: 'school-student-discount',
  templateUrl: './student-discount.component.html',
  styleUrls: ['./student-discount.component.scss']
})
export class StudentDiscountComponent implements OnInit {
  public studentFeeDiscount: MatTableDataSource<StudentFeeDiscount>;
  public displayColumn: Array<string> = [
    "studenttype",
    "feetype",
    "amount",
    "status",
    "edit",
    "delete"
  ];
  public totalCount: number = 0;
  public addEditForm: FormGroup;
  @ViewChild("addEditDiscount") addEditDiscount: TemplateRef<StudentFeeDiscount>;
  public statusList: Array<Status>;
  private addOrEdit: string;
  private title: string;
  private dialogRef: MatDialogRef<StudentFeeDiscount, any>;
  private feeTypes: Array<Feetype>;
  private studentType: Array<StudentType>;

  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private studentService: StudentService,
    private masterService: MasterDataService,
    private feeService: FeeService) { }

  ngOnInit() {
    this.studentType = new Array<StudentType>();
    this.studentService.studentType().subscribe(
      stuType => {
        if (stuType && stuType.length > 0)
          this.studentType = stuType;
        else {
          this.snackBar.open("No student type available !!!", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open(error + " occured while getting student type", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.feeTypes = new Array<Feetype>();
    this.feeService.types().subscribe(
      feetype => {
        if (feetype && feetype.length > 0)
          this.feeTypes = feetype;
        else {
          this.snackBar.open("No fee type available !!!", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open(error + " occured while getting fee types", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.statusList = new Array<Status>();
    this.masterService.status().subscribe(
      status => {
        this.statusList = status;
      },
      error => {
        this.snackBar.open(error + " occured while getting status", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.studentFeeDiscount = new MatTableDataSource<StudentFeeDiscount>();
    this.totalCount = this.studentFeeDiscount.data.length;
    this.studentService.studentfeediscount().subscribe(
      stuFee => {
        this.studentFeeDiscount.data = stuFee;
        this.totalCount = this.studentFeeDiscount.data.length;
      },
      error => {
        this.snackBar.open(error + " occured while getting student type", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  /**
   * add
   */
  public add() {
    this.addOrEdit = "add";
    this.title = "Add Student Fee Discount";
    this.addEditForm = new FormGroup({
      studenttype: new FormControl({ value: "", disabled: false }, [Validators.required]),
      feetype: new FormControl({ value: "", disabled: false }, [Validators.required]),
      amount: new FormControl({ value: "", disabled: false }, [Validators.required]),
      status: new FormControl({ value: "", disabled: false }, [Validators.required])
    });

    this.dialogRef = this.dialog.open(this.addEditDiscount, {
      width: "250px"
    });
    this.dialogRef.disableClose = true;
  }

  /**
   * edit
   * @param studentFeeDiscount
   */
  public edit(studentFeeDiscount: StudentFeeDiscount) {
    this.addOrEdit = "edit";
    this.title = "Edit Student Fee Discount";
    this.addEditForm = new FormGroup({
      id: new FormControl({ value: studentFeeDiscount.Id, disabled: false }),
      studenttype: new FormControl({ value: studentFeeDiscount.StudentTypeId, disabled: false }, [Validators.required]),
      feetype: new FormControl({ value: studentFeeDiscount.FeeTypeId, disabled: false }, [Validators.required]),
      amount: new FormControl({ value: studentFeeDiscount.Amount, disabled: false }, [Validators.required]),
      status: new FormControl({ value: studentFeeDiscount.StatusId, disabled: false }, [Validators.required])
    });
    this.dialogRef = this.dialog.open(this.addEditDiscount, {
      width: "250px"
    });
    this.dialogRef.disableClose = true;
  }

  /**
   * delete
   * @param studentFeeDiscount 
   */
  public delete(studentFeeDiscount: StudentFeeDiscount) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Student type",
        message: "Are you really want to delete this Fee Discount?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.studentService.deletefeediscount(studentFeeDiscount).subscribe(
          (status: Array<StudentFeeDiscount>) => {
            if (status) {
              this.snackBar.open("Fee Discount deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
              this.studentFeeDiscount.data = status;
              this.totalCount = this.studentFeeDiscount.data.length
            } else {
              this.snackBar.open("Not able to delete Fee Discount", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while deleting Fee Discount", "", {
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
   * cancel
   */
  public cancel() {
    this.dialogRef.close();
  }

  /**
   * save
   */
  public save() {
    if (this.addEditForm.valid) {
      let studentFeeDiscountModel = this.addEditForm.value;
      let studentFeeDiscount = <StudentFeeDiscount>{
        Id: studentFeeDiscountModel.id,
        StudentTypeId: studentFeeDiscountModel.studenttype,
        FeeTypeId: studentFeeDiscountModel.feetype,
        Amount: studentFeeDiscountModel.amount,
        StatusId: studentFeeDiscountModel.status
      };
      switch (this.addOrEdit) {
        case "add":
          this.studentService.addfeediscount(studentFeeDiscount).subscribe(
            status => {
              if (status) {
                this.snackBar.open("Fee Discount added successfully !!!", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
                this.studentFeeDiscount.data = status;
                this.totalCount = this.studentFeeDiscount.data.length
                this.dialogRef.close();
              } else {
                this.snackBar.open("Not able to add Fee Discount", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open("An error occured while adding Fee Discount", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          );
          break;
        case "edit":
          this.studentService.editfeediscount(studentFeeDiscount).subscribe(
            status => {
              if (status) {
                this.snackBar.open("Fee Discount updated successfully !!!", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
                this.studentFeeDiscount.data = status;
                this.totalCount = this.studentFeeDiscount.data.length
                this.dialogRef.close();
              } else {
                this.snackBar.open("Not able to update Fee Discount", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open("An error occured while updating Fee Discount", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          );
          break;
        default:
          break;
      }
    }
  }
}
