import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  DialogPosition,
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from "@angular/material";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

import { ProfileDailogComponent } from "./profile-dailog/profile-dailog.component";
import { GlobalVariableService } from "./services/global-variable.service";

const defaultDialogConfig = new MatDialogConfig();

@Component({
  selector: "school-root",
  templateUrl: "./school.component.html",
  styleUrls: ["./school.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SchoolComponent implements OnInit {
  private dialogRef: MatDialogRef<ProfileDailogComponent> | null;
  private config = {
    id: "profile-dialog",
    disableClose: false,
    panelClass: "",
    hasBackdrop: true,
    backdropClass: "",
    width: "",
    height: "",
    position: <DialogPosition>{
      top: "80px",
      bottom: "",
      left: "",
      right: "10px"
    },
    data: {
      message: ""
    }
  };
  constructor(
    private router: Router,
    private globalVar: GlobalVariableService,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join("-");
        this.titleService.setTitle(title);
      }
    });
  }

  /**
   * getTitle
   * @param state 
   * @param parent 
   */
  private getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  public ngOnInit(): void {}

  /**
   * profile
   */
  public profile() {
    this.dialogRef = this.dialog.open(ProfileDailogComponent, this.config);
    this.dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "profile":
          this.router.navigate(["/user/profile"]);
          break;
        case "signout":
          sessionStorage.clear();
          this.globalVar.setAthentication(false);
          break;
        default:
          break;
      }
      this.dialogRef = null;
    });
  }
}
