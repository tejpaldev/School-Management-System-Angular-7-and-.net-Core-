import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Input, Inject } from "@angular/core";
import { StudentProfile } from "../../models/student-profile.model";

@Component({
  selector: "school-student-profile-detail",
  templateUrl: "./student-profile-detail.component.html",
  styleUrls: ["./student-profile-detail.component.scss"]
})
export class StudentProfileDetailComponent implements OnInit {
  @Input() profile: StudentProfile;
  constructor(
    public dialogRef: MatDialogRef<StudentProfileDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentProfile
  ) {}

  ngOnInit() {}
}
