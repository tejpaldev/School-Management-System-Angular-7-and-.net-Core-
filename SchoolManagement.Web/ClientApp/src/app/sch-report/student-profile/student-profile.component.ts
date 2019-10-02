import { filter } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import { ReportFilter } from "../../models/report-filter";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ReportService } from "../../services/report.service";
import { StudentProfile } from "../../models/student-profile.model";
import { Student } from "../../models/student";

@Component({
  selector: "school-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.scss"]
})
export class StudentProfileComponent implements OnInit, OnChanges {
  @Input() filter: ReportFilter;
  public profiles: Array<StudentProfile>;
  constructor(
    private reportService: ReportService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    let filters: ReportFilter = changes["filter"].currentValue;
    this.profiles = new Array<StudentProfile>();
    if (filters.AdmissionNo || filters.StudentName) {
      this.reportService.studentProfile(filters).subscribe(
        profile => {
          if (profile && profile.length > 0) {
            this.profiles = profile;
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
   * getFullName
   * @param profile : Student
   */
  public getFullName(profile: Student): string {
    let fullName: string = "";
    if (profile.Middlename) {
      fullName = `${profile.Firstname} ${profile.Middlename} ${
        profile.Lastname
      }`;
    } else {
      fullName = `${profile.Firstname} ${profile.Lastname}`;
    }
    return fullName;
  }

  /**
   * viewDetails
   * @param profile : StudentProfile
   */
  public viewDetails(profile: StudentProfile) {}
}
