import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";

import { Fee } from "../../models/fee.model";
import { FeeConfirmComponent } from "../fee-confirm/fee-confirm.component";

@Component({
  selector: "school-fee-detail",
  templateUrl: "./fee-detail.component.html",
  styleUrls: ["./fee-detail.component.scss"]
})
export class FeeDetailComponent implements OnInit, OnChanges {
  @Input() FeeData: Array<Fee>;
  @Input() RemovedFee: Fee;
  @Output() FeePaying: EventEmitter<Fee> = new EventEmitter<Fee>();

  public currentData: Array<Fee>;
  private baseFeeDiscounts: Array<Fee> = new Array<Fee>();
  displayedColumns: Array<string> = [
    "date",
    "feetype",
    "amount",
    "fine",
    "discount",
    "status",
    "comment",
    "action"
  ];
  resultsLength: number = 0;
  pageSize: number = 10;
  public dataSource: MatTableDataSource<Fee>;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["FeeData"] !== undefined &&
      changes["FeeData"].currentValue !== changes["FeeData"].previousValue
    ) {
      this.currentData = changes["FeeData"].currentValue;
      this.currentData.forEach(x => {
        let fee = this.baseFeeDiscounts.findIndex(fee => {
          if (fee.FeeTypeId == x.FeeTypeId) return true;
          else return false;
        });
        if (fee === -1 && x.IsPaid) {
          this.baseFeeDiscounts.push(x);
        }
      });
      this.dataSource = new MatTableDataSource(this.currentData);
      this.resultsLength = this.currentData.length;
    }
    if (
      changes["RemovedFee"] !== undefined &&
      changes["RemovedFee"].currentValue !== changes["RemovedFee"].previousValue
    ) {
      let fee = changes["RemovedFee"].currentValue;
      this.currentData.forEach(x => {
        let discount = this.baseFeeDiscounts.find(fee => {
          if (fee.FeeTypeId === x.FeeTypeId) return true;
          else return false;
        });
        if (x.FeeTypeId === fee.FeeTypeId && x.FeeDate === fee.FeeDate) {
          x.Discount = discount.Discount;
          x.Comment = "";
          x.IsPaid = false;
        }
      });
    }
  }

  /**
   * payfee
   */
  public payfee(fee: Fee) {
    let dialogRef = this.dialog.open(FeeConfirmComponent, {
      width: "250px",
      data: {
        title: "Fee Confirm",
        fee: fee
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.status) {
        this.currentData.forEach(x => {
          if (
            x.FeeTypeId === result.fee.FeeTypeId &&
            x.FeeDate === result.fee.FeeDate
          ) {
            x.Discount = result.fee.Discount;
            x.Comment = result.fee.Comment;
            x.IsPaid = true;
            return true;
          } else {
            return false;
          }
        });
        this.FeePaying.emit(result.fee);
      }
    });
  }
}
