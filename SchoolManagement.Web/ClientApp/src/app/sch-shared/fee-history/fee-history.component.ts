import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material";

import { Fee } from "../../models/fee.model";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "school-fee-history",
  templateUrl: "./fee-history.component.html",
  styleUrls: ["./fee-history.component.scss"]
})
export class FeeHistoryComponent implements OnInit {
  private _data = new BehaviorSubject<Array<Fee>>(new Array<Fee>());
  @Input()
  set data(value) {
    this._data.next(value);
  }
  get data() {
    return this._data.getValue();
  }

  displayedColumns: Array<string> = [
    "date",
    "feetype",
    "amount",
    "fine",
    "discount",
    "paymentmode",
    "comment"
  ];
  resultsLength: number = 0;
  pageSize: number = 10;
  feeDetails: MatTableDataSource<Fee> = new MatTableDataSource<Fee>();
  constructor() {}

  ngOnInit() {
    this._data.subscribe(x => {
      this.updateFeeDetails(this.data);
    });
  }

  private updateFeeDetails(feeData: Array<Fee>): any {
    this.feeDetails.data = feeData;
    this.resultsLength = feeData.length;
  }
}
