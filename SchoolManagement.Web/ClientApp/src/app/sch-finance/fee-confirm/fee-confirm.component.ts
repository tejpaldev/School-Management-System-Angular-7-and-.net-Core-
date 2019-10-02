import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "school-fee-confirm",
  templateUrl: "./fee-confirm.component.html",
  styleUrls: ["./fee-confirm.component.scss"]
})
export class FeeConfirmComponent implements OnInit {
  public feeForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FeeConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.feeForm = new FormGroup({
      amount: new FormControl({ value: this.data.fee.Amount, disabled: true }),
      fine: new FormControl({ value: this.data.fee.Fine, disabled: true }),
      discount: new FormControl({
        value: this.data.fee.Discount,
        disabled: false
      }),
      comment: new FormControl({
        value: this.data.fee.Comment,
        disabled: false
      })
    });
  }

  /**
   * cancel
   */
  public cancel() {
    this.dialogRef.close({ status: false, fee: this.data.fee });
  }

  /**
   * submit
   */
  public submit() {
    if (this.feeForm.valid) {
      let formValue = this.feeForm.value;
      this.data.fee.Discount = formValue.discount;
      this.data.fee.Comment = formValue.comment;
      this.dialogRef.close({ status: true, fee: this.data.fee });
    }
  }
}
