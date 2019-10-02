import {
  MatTableDataSource,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { Fee } from "../../models/fee.model";

@Component({
  selector: "school-fee-detail",
  templateUrl: "./fee-detail.component.html",
  styleUrls: ["./fee-detail.component.scss"]
})
export class FeeDetailComponent implements OnInit {
  public title: string = "Fee Details";
  public feeData: MatTableDataSource<Fee>;
  public feeColumns: Array<string>;

  constructor(
    public dialogRef: MatDialogRef<FeeDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.feeColumns = this.data.displayColumn;
    this.feeData = new MatTableDataSource(this.data.fees);
  }

  /**
   * close
   */
  public close() {
    this.dialogRef.close(true);
  }
}
