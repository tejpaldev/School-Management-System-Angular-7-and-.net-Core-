import { MatSnackBar, MatTableDataSource, MatDialog } from "@angular/material";
import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { ReportFilter } from "../../models/report-filter";
import { StudentProfile } from "../../models/student-profile.model";
import { ReportService } from "../../services/report.service";
import { Fee } from "../../models/fee.model";
import { Parent } from "../../models/parent";
import { FeeDetailComponent } from "../fee-detail/fee-detail.component";
import { ParentDetailComponent } from "../parent-detail/parent-detail.component";

@Component({
  selector: "school-fee-collection",
  templateUrl: "./fee-collection.component.html",
  styleUrls: ["./fee-collection.component.scss"]
})
export class FeeCollectionComponent implements OnInit {
  @Input() filter: ReportFilter;
  public feeCollection: Array<StudentProfile>;
  public collectionData: MatTableDataSource<StudentProfile>;
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
  public feeColumns = ["feetype", "amount"];
  public parentColumns = ["parenttype", "name"];
  constructor(
    private reportService: ReportService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    let filters: ReportFilter = changes["filter"].currentValue;
    this.feeCollection = new Array<StudentProfile>();
    if (
      filters.FromDate &&
      filters.ToDate &&
      (filters.ClassIds || filters.SectionIds)
    ) {
      this.reportService.feeCollection(filters).subscribe(
        feeCollection => {
          if (feeCollection && feeCollection.length > 0) {
            this.feeCollection = feeCollection;
            this.collectionData = new MatTableDataSource<StudentProfile>();
            this.feeCollection = feeCollection;
            this.collectionData.data = feeCollection;
            this.resultsLength = feeCollection.length;
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
        "discount",
        "comment",
        "paymentmode",
        "transactionno",
        "checknumber",
        "clearencedate"
      ],
      fees: fees
    };

    this.dialog.open(FeeDetailComponent, {
      width: "1000px",
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
