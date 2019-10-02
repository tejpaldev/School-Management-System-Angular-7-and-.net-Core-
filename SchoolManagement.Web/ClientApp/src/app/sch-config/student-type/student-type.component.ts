import { ConfirmDialogComponent } from '../../sch-shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatSnackBar, MatDialogRef } from '@angular/material';

import { StudentService } from '../../services/student.service';
import { MasterDataService } from '../../services/master-data.service';
import { StudentType } from '../../models/student-type.model';
import { Status } from '../../models/status.model';

const STUDENTTYPE_REGEX = /([A-Za-z])+$/;

@Component({
  selector: 'school-student-type',
  templateUrl: './student-type.component.html',
  styleUrls: ['./student-type.component.scss']
})
export class StudentTypeComponent implements OnInit {

  public studentType: MatTableDataSource<StudentType>;
  public displayColumn: Array<string> = [
    "name",
    "description",
    "status",
    "edit",
    "delete"
  ];
  public totalCount: number = 0;
  public addEditForm: FormGroup;
  @ViewChild("addEditType") addEditType: TemplateRef<StudentType>;
  public statusList: Array<Status>;
  private addOrEdit: string;
  private title: string;
  private dialogRef: MatDialogRef<StudentType, any>;

  constructor(public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private studentService: StudentService,
    private masterService: MasterDataService) { }

  ngOnInit() {
    this.statusList = new Array<Status>();
    this.masterService.status().subscribe(
      status => {
        this.statusList = status;
      },
      error => {
        this.snackBar.open(error.error.error_description + " occured while getting status", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.studentType = new MatTableDataSource<StudentType>();
    this.totalCount = this.studentType.data.length;
    this.studentService.studentType().subscribe(
      stuType => {
        this.studentType.data = stuType;
        this.totalCount = this.studentType.data.length;
      },
      error => {
        this.snackBar.open(error.error.error_description + " occured while getting student type", "", {
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
    this.title = "Add Student Type";
    this.addEditForm = new FormGroup({
      name: new FormControl({ value: "", disabled: false },
        [Validators.required, Validators.pattern(STUDENTTYPE_REGEX)]),
      description: new FormControl({ value: "", disabled: false }),
      status: new FormControl({ value: "", disabled: false }, [Validators.required])
    });

    this.dialogRef = this.dialog.open(this.addEditType, {
      width: "250px"
    });
    this.dialogRef.disableClose = true;
  }

  /**
   * edit
   * @param studentType
   */
  public edit(studentType: StudentType) {
    this.addOrEdit = "edit";
    this.title = "Edit Student Type";
    this.addEditForm = new FormGroup({
      id: new FormControl({ value: studentType.Id, disabled: false }, [Validators.required]),
      name: new FormControl({ value: studentType.Name, disabled: false },
        [Validators.required, Validators.pattern(STUDENTTYPE_REGEX)]),
      description: new FormControl({ value: studentType.Description, disabled: false }),
      status: new FormControl({ value: studentType.StatusId, disabled: false }, [Validators.required])
    });
    this.dialogRef = this.dialog.open(this.addEditType, {
      width: "250px"
    });
    this.dialogRef.disableClose = true;
  }

  /**
   * delete
   * @param studentType 
   */
  public delete(studentType: StudentType) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Student type",
        message: "Are you really want to delete this student type?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.studentService.deletestudenttype(studentType).subscribe(
          status => {
            if (status) {
              this.snackBar.open("Student type deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
              this.studentType.data = status;
              this.totalCount = this.studentType.data.length
            } else {
              this.snackBar.open("Not able to delete Student type", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while deleting Student type", "", {
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
      let studentTypeModel = this.addEditForm.value;
      let studentType = <StudentType>{
        Id: studentTypeModel.id,
        Name: studentTypeModel.name,
        Description: studentTypeModel.description,
        StatusId: studentTypeModel.status
      };
      switch (this.addOrEdit) {
        case "add":
          this.studentService.addstudenttype(studentType).subscribe(
            status => {
              if (status) {
                this.snackBar.open("Student type added successfully !!!", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
                this.studentType.data = status;
                this.totalCount = this.studentType.data.length
                this.dialogRef.close();
              } else {
                this.snackBar.open("Not able to add Student type", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open("An error occured while adding Student type", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          );
          break;
        case "edit":
          this.studentService.editstudenttype(studentType).subscribe(
            status => {
              if (status) {
                this.snackBar.open("Student type updated successfully !!!", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
                this.studentType.data = status;
                this.totalCount = this.studentType.data.length
                this.dialogRef.close();
              } else {
                this.snackBar.open("Not able to update Student type", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open("An error occured while updating Student type", "", {
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
