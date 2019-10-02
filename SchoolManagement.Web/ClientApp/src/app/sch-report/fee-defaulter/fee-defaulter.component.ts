import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { MatSnackBar, MatTableDataSource, MatDialog } from "@angular/material";

import { Fee } from "./../../models/fee.model";
import { Parent } from "./../../models/parent";
import { ReportFilter } from "../../models/report-filter";
import { StudentProfile } from "../../models/student-profile.model";
import { ReportService } from "../../services/report.service";
import { FeeDetailComponent } from "../fee-detail/fee-detail.component";
import { ParentDetailComponent } from "../parent-detail/parent-detail.component";

@Component({
  selector: "school-fee-defaulter",
  templateUrl: "./fee-defaulter.component.html",
  styleUrls: ["./fee-defaulter.component.scss"]
})
export class FeeDefaulterComponent implements OnInit {
  @Input() filter: ReportFilter;
  public feeDefault: Array<StudentProfile>;
  public defaulterData: MatTableDataSource<StudentProfile>;
  public resultsLength = 0;
  public studentColumns = [
    "index",
    "admissionno",
    "name",
    "class",
    "section",
    "parent",
    "fee",
    "total"
  ];
  public parentColumns = ["parenttype", "name"];
  constructor(
    private reportService: ReportService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    let filters: ReportFilter = changes["filter"].currentValue;
    this.feeDefault = new Array<StudentProfile>();
    if (filters.FeeTypeIds && (filters.ClassIds || filters.SectionIds)) {
      this.reportService.defaulterStudent(filters).subscribe(
        feeDefault => {
          if (feeDefault && feeDefault.length > 0) {
            this.defaulterData = new MatTableDataSource<StudentProfile>();
            this.feeDefault = feeDefault;
            this.defaulterData.data = feeDefault;
            this.resultsLength = feeDefault.length;
          } else {
            this.snackBar.open("No profile is available", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting profile", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * viewParentDetail
   * @param parents : Array<Parent>
   */
  public viewParentDetail(parents: Array<Parent>): void {
    let data = {
      displayColumn: ["index", "type", "name", "contact", "email", "address"],
      parents: parents
    };

    this.dialog.open(ParentDetailComponent, {
      width: "800px",
      data: data
    });
  }

  /**
   * viewFeeDetail
   * @param fees : Array<Fee>
   */
  public viewFeeDetail(fees: Array<Fee>): void {
    let data = {
      displayColumn: [
        "index",
        "feetype",
        "feedate",
        "amount",
        "fine",
        "discount"
      ],
      fees: fees
    };

    this.dialog.open(FeeDetailComponent, {
      width: "800px",
      data: data
    });
  }

  /**
   * getTotalFee
   * @param fees : Array<Fee>
   */
  public getTotalFee(fees: Array<Fee>): number {
    let total = 0;
    fees.forEach(fee => {
      total = total + fee.Amount;
    });
    return total;
  }
}
