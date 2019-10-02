import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { Class } from "../../models/class";
import { Student } from "../../models/student";
import { ClassService } from "../../services/class.service";
import { StudentService } from "../../services/student.service";
import { SearchForm } from "../../models/master";

@Component({
  selector: "school-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  public classes: Array<Class>;
  public studentData: MatTableDataSource<Student>;
  public displayColumns: Array<string>;
  public resultsLength: number;
  constructor(
    public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService: StudentService,
    private classService: ClassService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.dialogRef.disableClose = true;
    this.displayColumns = [
      "registrationno",
      "admissionno",
      "name",
      "dateofbirth",
      "class",
      "section",
      "stream",
      "view"
    ];
    this.resultsLength = 0;
    this.searchForm = new FormGroup({
      registrationno: new FormControl({ value: "", disabled: false }),
      admissionno: new FormControl({ value: "", disabled: false }),
      class: new FormControl({ value: "", disabled: false }),
      studentname: new FormControl({ value: "", disabled: false }),
      dateofbirth: new FormControl({ value: "", disabled: false }),
      contact: new FormControl({ value: "", disabled: false })
    });
  }

  ngOnInit() {
    this.classService.class().subscribe(
      classes => {
        if (classes) {
          this.classes = <Array<Class>>classes;
        } else {
          this.snackBar.open("No Class is available", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting class", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  /**
   * cancel
   */
  public cancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * select
   */
  public select(student: Student) {
    this.dialogRef.close(student);
  }

  /**
   * search
   */
  public search(): void {
    if (this.searchForm.valid) {
      let searchModel = this.searchForm.value;
      let searchForm = <SearchForm>{
        RegistrationNo: searchModel.registrationno,
        AdmissionNo: searchModel.admissionno,
        ClassId: searchModel.class,
        StudentName: searchModel.studentname,
        DateofBirth: searchModel.dateofbirth,
        Contact: searchModel.contact
      };
      this.studentService.search(searchForm).subscribe(
        students => {
          this.studentData = new MatTableDataSource<Student>();
          if (students) {
            this.studentData.data = students;
            this.resultsLength = students.length;
          } else {
            this.studentData.data = null;
            this.resultsLength = 0;
            this.snackBar.open("No student matching search criteria", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while searching student", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * reset
  */
  public reset():void {
    this.searchForm.reset();
  }
}
