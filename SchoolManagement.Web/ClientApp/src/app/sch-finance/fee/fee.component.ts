import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";

import { Class } from "../../models/class";
import { Fee } from "../../models/fee.model";
import { ClassService } from "../../services/class.service";
import { StudentService } from "../../services/student.service";
import { Feepay } from "../../models/feepay.model";
import { SearchForm } from "../../models/master";
import { Student } from "../../models/student";

@Component({
  selector: "school-fee",
  templateUrl: "./fee.component.html",
  styleUrls: ["./fee.component.scss"]
})
export class FeeComponent implements OnInit {
  payClicked: boolean = false;
  classId: Guid;
  studentId: Guid;
  removedFee: Fee;
  payingFeeList: Array<Fee>;
  currentData: Array<Fee>;
  displayedColumns = [
    "admissionno",
    "name",
    "dateofbirth",
    "class",
    "section",
    "stream",
    "pay"
  ];
  classes: Array<Class>;
  searchFormGroup: FormGroup;
  students: Array<Student>;
  studentData: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  resultsLength: number = 0;
  feePayInput: Feepay = {
    classId: Guid.createEmpty(),
    studentId: Guid.createEmpty()
  };
  constructor(
    private classService: ClassService,
    private studentService: StudentService
  ) {
    this.classes = new Array<Class>();
    this.classService.class().subscribe(
      classes => {
        this.classes = <Array<Class>>classes;
      },
      error => {}
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
          this.students = students;
          this.payClicked = false;
          this.studentData.data = students;
          this.resultsLength = students.length;
        },
        error => {}
      );
    }
  }

  /**
   * feeStatus
   */
  public feeStatus(studentId: Guid, classId: Guid) {
    this.classId = classId;
    this.studentId = studentId;
    this.payClicked = true;
  }

  /**
   * payingFee
   */
  public payingFee(fee: Fee) {
    if (!this.currentData) this.currentData = new Array<Fee>();
    this.payingFeeList = new Array<Fee>();
    this.currentData.push(fee);
    this.payingFeeList = this.currentData.slice(0);
  }

  /**
   * removeFee
   */
  public removeFee(fee: Fee) {
    this.removedFee = fee;
  }
}
