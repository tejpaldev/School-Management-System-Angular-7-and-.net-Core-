import { Component, OnInit } from "@angular/core";

import { ReportFilter } from "../../models/report-filter";

@Component({
  selector: "school-fee-report",
  templateUrl: "./fee-report.component.html",
  styleUrls: ["./fee-report.component.scss"]
})
export class FeeReportComponent implements OnInit {
  public fieldList: any;
  public errorMsg: string = "";
  public isStudentProfile: boolean = false;
  public filter: ReportFilter;
  public isFeeCollection: boolean;
  public isDefaulter: boolean;
  constructor() {}

  ngOnInit() {
    this.isDefaulter = false;
    this.isFeeCollection = true;
    this.fieldList = {
      IsAdmission: false,
      IsName: false,
      IsFeeType: false
    };
  }

  /**
   * change ui for fee collect
   */
  public feeCollect(): void {
    this.isDefaulter = false;
    this.isFeeCollection = true;
    this.fieldList = {
      IsAdmission: false,
      IsName: false,
      IsFeeType: false
    };
  }

  /**
   * change ui for fee Defaulter
   */
  public feeDefaulter(): void {
    this.isDefaulter = true;
    this.isFeeCollection = false;
    this.fieldList = {
      IsAdmission: false,
      IsName: false,
      IsFromDate: false,
      IsToDate: false
    };
  }

  /**
   * filters
   * @param reportFilter : ReportFilter
   */
  public filters(reportFilter: ReportFilter) {
    if (this.isFeeCollection) {
      if (
        reportFilter.FromDate &&
        reportFilter.ToDate &&
        (reportFilter.ClassIds || reportFilter.SectionIds)
      ) {
        this.errorMsg = "";
        this.filter = reportFilter;
      } else {
        this.errorMsg = "*At least one field is required.";
      }
    }
    if (this.isDefaulter) {
      if (
        reportFilter.FeeTypeIds &&
        (reportFilter.ClassIds || reportFilter.SectionIds)
      ) {
        this.errorMsg = "";
        this.filter = reportFilter;
      } else {
        this.errorMsg = "*At least one field is required.";
      }
    }
  }
}
