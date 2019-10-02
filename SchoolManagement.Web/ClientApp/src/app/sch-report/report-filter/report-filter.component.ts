import { MatSnackBar } from "@angular/material";
import { FormGroup, FormControl } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ReportFilter } from "../../models/report-filter";
import { Class, Section } from "../../models/class";
import { Feetype } from "../../models/feetype.model";
import { ClassService } from "../../services/class.service";
import { FeeService } from "../../services/fee.service";

@Component({
  selector: "school-report-filter",
  templateUrl: "./report-filter.component.html",
  styleUrls: ["./report-filter.component.scss"]
})
export class ReportFilterComponent implements OnInit, OnChanges {
  @Input() filterRender?: any;
  @Output()
  reportFilter: EventEmitter<ReportFilter> = new EventEmitter<ReportFilter>();

  public filterForm: FormGroup;
  public classes: Array<Class>;
  public sections: Array<Section>;
  public feeTypes: Array<Feetype>;
  public fieldList: any;
  constructor(
    private classService: ClassService,
    public snackBar: MatSnackBar,
    private feeService: FeeService
  ) {}

  ngOnInit(): void {
    this.classes = new Array<Class>();
    this.classService.class().subscribe(
      classes => {
        if (classes && classes.length > 0) {
          this.classes = classes;
        } else {
          this.snackBar.open("No data available for Class", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Class", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.feeTypes = new Array<Feetype>();
    this.feeService.types().subscribe(
      feetypes => {
        if (feetypes && feetypes.length > 0) {
          this.feeTypes = feetypes;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.fieldList = {
      IsAdmission: true,
      IsName: true,
      IsClass: true,
      IsSection: true,
      IsFromDate: true,
      IsToDate: true,
      IsFeeType: true
    };
    let filters = changes["filterRender"].currentValue;
    this.filterForm = new FormGroup({
      fromdate: new FormControl({ value: "", disabled: false }),
      todate: new FormControl({ value: "", disabled: false }),
      class: new FormControl({ value: [], disabled: false }),
      section: new FormControl({ value: [], disabled: true }),
      feetype: new FormControl({ value: [], disabled: false }),
      studentname: new FormControl({ value: "", disabled: false }),
      admissionno: new FormControl({ value: "", disabled: false })
    });
    if (filters) {
      Object.assign(this.fieldList, filters);
      if (!this.fieldList.IsFromDate)
        this.filterForm.controls.fromdate.disable();
      if (!this.fieldList.IsToDate) this.filterForm.controls.todate.disable();
      if (!this.fieldList.IsClass) this.filterForm.controls.class.disable();
      if (!this.fieldList.IsFeeType) this.filterForm.controls.feetype.disable();
      if (!this.fieldList.IsAdmission)
        this.filterForm.controls.admissionno.disable();
      if (!this.fieldList.IsName)
        this.filterForm.controls.studentname.disable();
    }
  }

  /**
   * classChanged
   */
  public classChanged() {
    let sectionControl = <FormControl>this.filterForm.get("section");
    let selectedClass = (<FormControl>this.filterForm.get("class")).value;
    if (selectedClass.length == 1) {
      this.sections = new Array<Section>();
      this.classService.section(selectedClass).subscribe(
        sections => {
          sectionControl.setValue("");
          this.sections = sections;
          if (this.sections.length > 0 && this.fieldList.IsSection) {
            sectionControl.enable();
          } else {
            sectionControl.disable();
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
    } else sectionControl.disable();
  }

  /**
   * filter
   */
  public filter() {
    if (this.filterForm.valid) {
      let formModel = this.filterForm.value;
      let filter = <ReportFilter>{
        AdmissionNo: formModel.admissionno,
        ClassIds: formModel.class,
        FeeTypeIds: formModel.feetype,
        FromDate: formModel.fromdate,
        SectionIds: formModel.section,
        StudentName: formModel.studentname,
        ToDate: formModel.todate
      };
      this.reportFilter.emit(filter);
    }
  }
}
