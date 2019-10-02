import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar, MatTableDataSource } from "@angular/material";

import { FeeService } from "../../services/fee.service";
import { Fee } from "../../models/fee.model";
import { PayMode } from "../../models/pay-mode.model";

@Component({
  selector: "school-fee-pay",
  templateUrl: "./fee-pay.component.html",
  styleUrls: ["./fee-pay.component.scss"]
})
export class FeePayComponent implements OnInit, OnChanges {
  @Output() feeRemoved: EventEmitter<Fee> = new EventEmitter<Fee>();
  @Input() payingFee: Array<Fee>;

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

  feeFormGroup: FormGroup;
  paymentMode: Array<PayMode>;
  constructor(private feeService: FeeService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.feeService.paymentMode().subscribe(
      payMode => {
        if (payMode && payMode.length > 0) {
          this.paymentMode = payMode;
        } else {
          this.snackBar.open("No payment mode defined", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting payment modes", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.createFeeFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["payingFee"] !== undefined &&
      changes["payingFee"].currentValue !== changes["payingFee"].previousValue
    ) {
      let currentData = changes["payingFee"].currentValue;
      this.dataSource = new MatTableDataSource(currentData);
      this.resultsLength = currentData.length;
    }
  }

  private createFeeFormGroup() {
    this.feeFormGroup = new FormGroup(
      {
        paymentMode: new FormControl({ value: "", disabled: false }),
        transactionNo: new FormControl({ value: "", disabled: false }),
        checkNumber: new FormControl({ value: "", disabled: false }),
        clearenceDate: new FormControl({ value: "", disabled: false })
      },
      (formGroup: FormGroup) => {
        return this.validateFee(formGroup);
      }
    );
  }

  private validateFee(formGroup: FormGroup) {
    const paymentMode = formGroup.controls["paymentMode"];
    const transactionNo = formGroup.controls["transactionNo"];
    const checkNumber = formGroup.controls["checkNumber"];
    const clearenceDate = formGroup.controls["clearenceDate"];
    if (paymentMode.value.length > 0) {
      if (
        paymentMode.value.toUpperCase() ==
        "F8501B09-769E-4134-9CD6-6B83D831CCDD"
      )
        return null;
      else if (
        paymentMode.value.toUpperCase() ==
          "49BFB1DA-522D-4371-808B-289DC64CA508" &&
        transactionNo.value.length > 0
      )
        return null;
      else if (
        paymentMode.value.toUpperCase() ==
          "19AAB34A-824F-4611-9EF1-9FF91D1D6763" &&
        checkNumber.value.length > 0 &&
        !isNaN(Number(checkNumber.value)) &&
        clearenceDate.value.length > 0
      )
        return null;
      else {
        return {
          validateFee: {
            valid: false
          }
        };
      }
    } else if (paymentMode.value.length == 0) {
      return null;
    } else
      return {
        validateFee: {
          valid: false
        }
      };
  }

  /**
   * feeSubmit
   */
  public feeSubmit() {
    if (this.feeFormGroup.valid) {
      let feeModel = this.feeFormGroup.value;
      let data = this.dataSource.data;
      let fees = new Array<Fee>();
      data.forEach(fee => {
        fees.push(<Fee>{
          StudentId: fee.StudentId,
          FeeTypeId: fee.FeeTypeId,
          Amount: Number(fee.Amount),
          FeeDate: fee.FeeDate,
          Fine: Number(fee.Fine),
          Discount: Number(fee.Discount),
          Comment: fee.Comment,
          PaymentModeId: feeModel.paymentMode,
          TransactionNo: feeModel.transactionNo,
          CheckNumber: Number(feeModel.checkNumber),
          ClearenceDate: feeModel.clearenceDate
        });
      });
      this.feeService.pay(fees).subscribe(
        payStatus => {
          if (payStatus) {
            this.dataSource = new MatTableDataSource();
            this.resultsLength = this.dataSource.data.length;
          } else {
            this.snackBar.open("Fee deposite is not successfull", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while deposit fee", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * remove
   */
  public remove(fee: Fee) {
    let currentData = this.dataSource.data;
    currentData = currentData.filter(x => {
      if (x.FeeTypeId === fee.FeeTypeId && x.FeeDate === fee.FeeDate) {
        return false;
      } else {
        return true;
      }
    });
    this.dataSource = new MatTableDataSource(currentData);
    this.resultsLength = currentData.length;
    this.feeRemoved.emit(fee);
  }
}
