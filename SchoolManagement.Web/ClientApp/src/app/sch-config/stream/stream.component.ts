import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";
import { BehaviorSubject } from "rxjs";

import { Stream } from "../../models/class";
import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { ClassService } from "../../services/class.service";
import { MasterDataService } from "../../services/master-data.service";

const STREAM_REGEX = /^[a-zA-Z]*$/;

@Component({
  selector: "school-stream",
  templateUrl: "./stream.component.html",
  styleUrls: ["./stream.component.scss"]
})
export class StreamComponent implements OnInit {
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
  isStreamAdd: boolean;
  isStreamDelete: boolean;
  addStreamForm: FormGroup;
  streamDataSource = new MatTableDataSource<Stream>();
  displayedColumns = ["name", "description", "action"];
  totalLength: number = 0;
  constructor(
    private masterDataService: MasterDataService,
    private classService: ClassService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.isStreamAdd = false;
    this.isStreamDelete = false;
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
      this.addStreamForm = new FormGroup({
        name: new FormControl({ value: "", disabled: false }, [
          Validators.required,
          Validators.pattern(STREAM_REGEX)
        ]),
        description: new FormControl({ value: "", disabled: false }),
        status: new FormControl({ value: "", disabled: false }, [
          Validators.required
        ])
      });
      this.isStreamAdd = true;
      this.isStreamDelete = false;
    }
    if (option.IsDelete) {
      this.classService.streamList().subscribe(
        stream => {
          if (stream.length > 0) {
            this.streamDataSource.data = stream;
            this.totalLength = stream.length;
          } else {
            this.snackBar.open("Add stream first", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        },
        error => {
          this.snackBar.open("An error occured while getting stream", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      );
      this.isStreamAdd = false;
      this.isStreamDelete = true;
    }
  }

  /**
   * addStream
   */
  public addStream() {
    if (this.addStreamForm.valid) {
      let streamModel = this.addStreamForm.value;
      let stream = <Stream>{
        Name: streamModel.name,
        Description: streamModel.description,
        StatusId: streamModel.status
      };
      this.classService.addstream(stream).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Stream added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Stream", "", {
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
   * deleteStream
   */
  public deleteStream(streamId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Stream?",
        message: "Do you want to delete this Stream ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deletestream(streamId).subscribe(
          status => {
            if (status) {
              this.classService.streamList().subscribe(
                stream => {
                  if (stream.length > 0) {
                    this.streamDataSource.data = stream;
                    this.totalLength = stream.length;
                  } else {
                    this.streamDataSource.data = null;
                    this.totalLength = 0;
                  }
                },
                error => {
                  this.snackBar.open(
                    "An error occured while getting stream",
                    "",
                    {
                      horizontalPosition: "center",
                      verticalPosition: "top",
                      duration: 2000
                    }
                  );
                }
              );
              this.snackBar.open("Stream deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete Stream", "", {
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
