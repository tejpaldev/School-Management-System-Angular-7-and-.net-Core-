import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'school-profile-dailog',
  templateUrl: './profile-dailog.component.html',
  styleUrls: ['./profile-dailog.component.scss']
})
export class ProfileDailogComponent implements OnInit {
public name:string;
  constructor(public dialogRef: MatDialogRef<ProfileDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.name="Krishna Singh";
    }

  ngOnInit() {
  }

}
