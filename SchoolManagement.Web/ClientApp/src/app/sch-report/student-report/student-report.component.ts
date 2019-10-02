import { ReportFilter } from '../../models/report-filter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'school-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  public fieldList: any;
  public errorMsg: string = "";
  public isStudentProfile: boolean = false;
  public filter: ReportFilter;
  constructor() { }

  ngOnInit() {
    this.fieldList = {
      IsClass: false,
      IsSection: false,
      IsFromDate: false,
      IsToDate: false,
      IsFeeType: false
    };
  }

  /**
   * filters
   * @param reportFilter : ReportFilter
   */
  public filters(reportFilter: ReportFilter) {
    if (reportFilter.StudentName !== "" || reportFilter.AdmissionNo !== "") {
      this.errorMsg = "";
      this.filter = reportFilter;
      this.isStudentProfile = true;
    }
    else {
      this.errorMsg = "*At least one field is required.";
    }
  }
}
