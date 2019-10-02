import { Stream } from "../../models/class";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";

import { Class, Section } from "../../models/class";
import { Fee } from "../../models/fee.model";
import { SearchForm } from "../../models/master";
import { Student } from "../../models/student";
import { FeeService } from "../../services/fee.service";
import { ClassService } from "../../services/class.service";
import { StudentService } from "../../services/student.service";

@Component({
  selector: "school-readmission",
  templateUrl: "./readmission.component.html",
  styleUrls: ["./readmission.component.scss"]
})
export class ReadmissionComponent implements OnInit {
  readmissionForm: FormGroup;
  currentYearFee: Array<Fee>;
  previousYearFee: Array<Fee>;
  viewClicked: boolean = false;
  isReadmission: boolean = false;
  searchFormGroup: FormGroup;
  studentData: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  resultsLength: number = 0;
  displayedColumns = [
    "admissionno",
    "name",
    "dateofbirth",
    "class",
    "section",
    "stream",
    "readmission",
    "view"
  ];
  classes: Array<Class>;
  sections: Array<Section>;
  streams: Array<Stream>;
  constructor(
    private studentService: StudentService,
    private classService: ClassService,
    private feeService: FeeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
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

  ngOnInit() {
    this.searchFormGroup = new FormGroup(
      {
        admissionno: new FormControl({ value: "", disabled: false }),
        studentname: new FormControl({ value: "", disabled: false }),
        class: new FormControl({ value: "", disabled: false })
      },
      (formGroup: FormGroup) => {
        return this.validateSearch(formGroup);
      }
    );
  }

  private validateSearch(formGroup: FormGroup) {
    const admissionNo = formGroup.controls["admissionno"];
    const studentName = formGroup.controls["studentname"];
    const selectedClass = formGroup.controls["class"];
    if (admissionNo.dirty && admissionNo.value.trim().length > 0) {
      return null;
    }
    if (studentName.dirty && studentName.value.trim().length > 0) {
      if (selectedClass.dirty && selectedClass.value.trim().length > 0) {
        return null;
      }
    }
    if (selectedClass.dirty && selectedClass.value.trim().length > 0) {
      return null;
    }

    return {
      validateSearch: {
        valid: false
      }
    };
  }

  /**
   * search
   */
  public search() {
    if (this.searchFormGroup.valid) {
      let searchModel = this.searchFormGroup.value;
      let searchForm = <SearchForm>{
        AdmissionNo: searchModel.admissionno,
        ClassId: searchModel.class,
        StudentName: searchModel.studentname
      };
      this.studentService.search(searchForm).subscribe(
        students => {
          if (students) {
            this.studentData.data = students;
            this.resultsLength = students.length;
            this.viewClicked = false;
            this.isReadmission = false;
          } else {
            this.studentData.data = null;
            this.resultsLength = 0;
            this.viewClicked = false;
            this.isReadmission = false;
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
   * readmission
   */
  public readmission() {
    if (this.readmissionForm.valid) {
      let readmissionValues = this.readmissionForm.value;
      let selectedClass = this.classes.find(
        x => x.Id === readmissionValues.class
      );
      let readmissionModel = <Student>{
        Id: readmissionValues.id,
        ClassId: readmissionValues.class,
        ClassCode: selectedClass.Code,
        SectionId: readmissionValues.section,
        StreamId: readmissionValues.stream
      };
      this.studentService.readmission(readmissionModel).subscribe(
        students => {
          if (students) {
            this.studentData.data = students;
            this.resultsLength = students.length;
            this.viewClicked = false;
            this.isReadmission = false;
          } else {
            this.studentData.data = null;
            this.resultsLength = 0;
            this.viewClicked = false;
            this.isReadmission = false;
            this.snackBar.open("Re admission of student failed.", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while re admission", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * readmissionForms
   */
  public readmissionForms(studentId: Guid) {
    this.isReadmission = true;
    this.readmissionForm = new FormGroup({
      id: new FormControl({ value: studentId, disabled: false }),
      class: new FormControl({ value: "", disabled: false }),
      section: new FormControl({ value: "", disabled: true }),
      stream: new FormControl({ value: "", disabled: true })
    });
  }

  /**
   * viewFeeHistory
   */
  public viewFeeHistory(studentId: Guid, classId: Guid) {
    this.feeService.feeDetails(studentId, classId).subscribe(
      feeDetail => {
        if (feeDetail) {
          this.previousYearFee = feeDetail.Previous;
          this.currentYearFee = feeDetail.Current;
          this.viewClicked = true;
        } else {
          this.previousYearFee = new Array<Fee>();
          this.currentYearFee = new Array<Fee>();
          this.viewClicked = false;
          this.snackBar.open("No student fee detail available", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open(
          "An error occured while getting student fee detail",
          "",
          {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          }
        );
      }
    );
  }

  /**
   * classChanged
   */
  public classChanged() {
    let sectionControl = <FormControl>this.readmissionForm.get("section");
    let streamControl = <FormControl>this.readmissionForm.get("stream");
    let selectedClass = (<FormControl>this.readmissionForm.get("class")).value;
    this.sections = new Array<Section>();
    this.classService.section(selectedClass).subscribe(
      sections => {
        sectionControl.setValue("");
        this.sections = sections;
        if (this.sections.length > 0) {
          streamControl.disable();
          streamControl.setValue("");
          sectionControl.enable();
        } else {
          sectionControl.disable();
          this.classService.stream(selectedClass).subscribe(
            streams => {
              streamControl.setValue("");
              this.streams = streams;
              if (this.streams.length > 0) streamControl.enable();
              else streamControl.disable();
            },
            error => {
              this.snackBar.open(
                "An error occured while getting Streams of class",
                "",
                {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                }
              );
            }
          );
        }
      },
      error => {
        this.snackBar.open(
          "An error occured while getting Sections of class",
          "",
          {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          }
        );
      }
    );
  }

  /**
   * sectionChanged
   */
  public sectionChanged() {
    let selectedClass = (<FormControl>this.readmissionForm.get("class")).value;
    let selectedSection = (<FormControl>this.readmissionForm.get("section"))
      .value;
    let streamControl = <FormControl>this.readmissionForm.get("stream");
    this.streams = new Array<Stream>();
    this.classService.stream(selectedClass, selectedSection).subscribe(
      streams => {
        streamControl.setValue("");
        this.streams = <Array<Stream>>streams;
        if (this.streams.length > 0) streamControl.enable();
        else streamControl.disable();
      },
      error => {
        this.snackBar.open(
          "An error occured while getting Streams of class",
          "",
          {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          }
        );
      }
    );
  }
}
