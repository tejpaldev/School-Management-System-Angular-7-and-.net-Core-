import { FeeService } from "../../services/fee.service";
import { Guid } from "guid-typescript";
import { Category } from "../../models/master";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { Fee } from "../../models/fee.model";
import { MatSnackBar } from "@angular/material";
import { ClassFee } from "../../models/classfee.model";

@Component({
  selector: "school-fee-category",
  templateUrl: "./fee-category.component.html",
  styleUrls: ["./fee-category.component.scss"]
})
export class FeeCategoryComponent implements OnInit, OnChanges {
  @Input() StudentId: Guid;
  @Input() ClassId: Guid;
  @Input() RemovedFee: Fee;
  @Output() FeePaying: EventEmitter<Fee> = new EventEmitter<Fee>();

  currentYearFee: Array<Fee>;
  previousYearFee: Array<Fee>;
  classfee: Array<ClassFee>;
  currentStudentId: Guid;
  currentClassId: Guid;
  currentRemovedFee: Fee;
  constructor(private feeService: FeeService, public snackBar: MatSnackBar) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["ClassId"] !== undefined &&
      changes["ClassId"].currentValue !== changes["ClassId"].previousValue
    ) {
      this.currentClassId = changes["ClassId"].currentValue;
      this.feeService.classFee(undefined, this.currentClassId).subscribe(
        classfee => {
          if (classfee && classfee.length > 0) {
            this.classfee = classfee;
          } else {
            this.snackBar.open("No fee structure defined for this class", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open(
            "An error occured while getting fee structure",
            "",
            {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            }
          );
        }
      );
    }
    if (
      changes["StudentId"] !== undefined &&
      changes["StudentId"].currentValue !== changes["StudentId"].previousValue
    ) {
      this.currentStudentId = changes["StudentId"].currentValue;
      this.feeService
        .feeDetails(this.currentStudentId, this.currentClassId)
        .subscribe(
          feeDetail => {
            this.previousYearFee = feeDetail.Previous;
            this.currentYearFee = feeDetail.Current;
          },
          error => {
            this.snackBar.open(
              "An error occured while getting fee details",
              "",
              {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              }
            );
          }
        );
    }

    if (
      changes["RemovedFee"] !== undefined &&
      changes["RemovedFee"].currentValue !== changes["RemovedFee"].previousValue
    ) {
      this.currentRemovedFee = changes["RemovedFee"].currentValue;
    }
  }

  /**
   * getFilteredFeeData
   */
  public getFilteredFeeData(feeTypeId: Guid): Array<Fee> {
    let filteredData = this.currentYearFee.filter(
      fee => fee.FeeTypeId == feeTypeId
    );
    return filteredData;
  }

  /**
   * feePaying
   */
  public feePaying(fee: Fee) {
    this.FeePaying.emit(fee);
  }
}
