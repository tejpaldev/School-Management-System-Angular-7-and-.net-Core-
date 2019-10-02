import {
  MatTableDataSource,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { Fee } from "../../models/fee.model";

@Component({
  selector: "school-parent-detail",
  templateUrl: "./parent-detail.component.html",
  styleUrls: ["./parent-detail.component.scss"]
})
export class ParentDetailComponent implements OnInit {
  public title: string = "Parent Details";
  public parentData: MatTableDataSource<Fee>;
  public parentColumns: Array<string>;
  constructor(
    public dialogRef: MatDialogRef<ParentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.parentColumns = this.data.displayColumn;
    this.parentData = new MatTableDataSource(this.data.parents);
  }

  /**
   * close
   */
  public close() {
    this.dialogRef.close(true);
  }
}
