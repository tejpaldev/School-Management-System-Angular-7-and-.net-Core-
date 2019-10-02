import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";
import { BehaviorSubject } from "rxjs";

import { Section } from "../../models/class";
import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { ClassService } from "../../services/class.service";
import { MasterDataService } from "../../services/master-data.service";

const SECTION_REGEX = /([A-Za-z][\s?][A-Z])+$/;

@Component({
  selector: "school-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"]
})
export class SectionComponent implements OnInit {
  private _data = new BehaviorSubject<Option>({
    IsAdd: true,
    IsDelete: false
  });

  @Input()
  set option(value) {
    this._data.next(value);
  }

  get option() {
    return this._data.getValue();
  }
  statusList: Array<Status>;
  isSectionDelete: boolean;
  isSectionAdd: boolean;
  addSectionForm: FormGroup;
  sectionDataSource = new MatTableDataSource<Section>();
  displayedColumns = ["name", "description", "action"];
  totalLength: number = 0;
  constructor(
    private masterDataService: MasterDataService,
    private classService: ClassService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.isSectionAdd = false;
    this.isSectionDelete = false;
    this.masterDataService.status().subscribe(
      status => {
        this.statusList = status;
      },
      error => {
        this.snackBar.open("An error occured while getting status", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  ngOnInit() {
    this._data.subscribe(x => {
      this.init(this.option);
    });
  }

  private init(option: Option) {
    if (option.IsAdd) {
      this.addSectionForm = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(SECTION_REGEX)
        ]),
        description: new FormControl({ value: "", disabled: false }),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
      this.isSectionAdd = true;
      this.isSectionDelete = false;
    }
    if (option.IsDelete) {
      this.classService.sectionList().subscribe(
        sections => {
          if (sections.length > 0) {
            this.sectionDataSource.data = sections;
            this.totalLength = sections.length;
          } else {
            this.snackBar.open("Add section first", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting sections", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
      this.isSectionAdd = false;
      this.isSectionDelete = true;
    }
  }

  /**
   * addSection
   */
  public addSection() {
    if (this.addSectionForm.valid) {
      let sectionModel = this.addSectionForm.value;
      let section = <Section>{
        Name: sectionModel.name,
        Description: sectionModel.description,
        StatusId: sectionModel.status
      };
      this.classService.addsection(section).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Section added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Section", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while adding", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
    }
  }

  /**
   * deleteSection
   */
  public deleteSection(sectionId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Section?",
        message: "Do you want to delete this Section ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deletesection(sectionId).subscribe(
          status => {
            if (status) {
              this.classService.sectionList().subscribe(
                sections => {
                  if (sections.length > 0) {
                    this.sectionDataSource.data = sections;
                    this.totalLength = sections.length;
                  } else {
                    this.sectionDataSource.data = null;
                    this.totalLength = 0;
                  }
                },
                error => {
                  this.snackBar.open(
                    "An error occured while getting sections",
                    "",
                    {
                      horizontalPosition: "center",
                      verticalPosition: "top",
                      duration: 2000
                    }
                  );
                }
              );
              this.snackBar.open("Section deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete Section", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while deleting", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        );
      }
    });
  }
}
