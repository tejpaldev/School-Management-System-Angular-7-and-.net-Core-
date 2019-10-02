import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { Guid } from "guid-typescript";
import { BehaviorSubject } from "rxjs";

import {
  Class,
  ClassSection,
  ClassStream,
  Section,
  Stream
} from "../../models/class";
import { Option } from "../../models/option-role.model";
import { Status } from "../../models/status.model";
import { ConfirmDialogComponent } from "../../sch-shared/confirm-dialog/confirm-dialog.component";
import { MasterDataService } from "../../services/master-data.service";
import { ClassService } from "../../services/class.service";

const CLASS_REGEX = /([A-Za-z][\s?]?[0-9]?)+$/;
const CODE_REGEX = /^[a-zA-Z0-9]*$/;

@Component({
  selector: "school-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.scss"]
})
export class ClassComponent implements OnInit {
  isClassStreamDelete: boolean;
  isClassStreamAdd: boolean;
  isClassSectionDelete: boolean;
  isClassSectionAdd: boolean;
  isClassDelete: boolean;
  isClassAdd: boolean;
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
  addClassForm: FormGroup;
  addClassSectionForm: FormGroup;
  addClassStreamForm: FormGroup;
  classList: Array<Class>;
  sectionList: Array<Section>;
  streamList: Array<Stream>;
  classDataSource = new MatTableDataSource<Class>();
  displayedColumns = ["name", "code", "description", "action"];
  totalLength: number = 0;
  sectionDataSource = new MatTableDataSource<ClassSection>();
  displayedColumnsSection = ["class", "section", "action"];
  totalLengthSection: number = 0;
  streamDataSource = new MatTableDataSource<ClassStream>();
  displayedColumnsStream = ["class", "section", "stream", "action"];
  totalLengthStream: number = 0;
  constructor(
    private masterDataService: MasterDataService,
    private classService: ClassService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
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
      if (option.Type == "section") {
        if (!this.classList) {
          this.classService.class().subscribe(
            classes => {
              if (classes && classes.length > 0) {
                this.classList = classes;
              } else {
                this.snackBar.open("Please add class first", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open(
                "An error occured while getting class list",
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
        if (!this.sectionList) {
          this.classService.sectionList().subscribe(
            section => {
              if (section && section.length > 0) {
                this.sectionList = section;
              } else {
                this.snackBar.open("Please add section first", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open(
                "An error occured while getting section list",
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
        this.addClassSectionForm = new FormGroup({
          class: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ]),
          section: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ]),
          status: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ])
        });
        this.isClassAdd = false;
        this.isClassDelete = false;
        this.isClassSectionAdd = true;
        this.isClassSectionDelete = false;
        this.isClassStreamAdd = false;
        this.isClassStreamDelete = false;
      } else if (option.Type == "stream") {
        if (!this.classList) {
          this.classService.class().subscribe(
            classes => {
              if (classes && classes.length > 0) {
                this.classList = classes;
              } else {
                this.snackBar.open("Please add class first", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open(
                "An error occured while getting class list",
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
        if (!this.streamList) {
          this.classService.streamList().subscribe(
            stream => {
              if (stream && stream.length > 0) {
                this.streamList = stream;
              } else {
                this.snackBar.open("Please add stream first", "", {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                });
              }
            },
            error => {
              this.snackBar.open(
                "An error occured while getting stream list",
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
        this.addClassStreamForm = new FormGroup({
          class: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ]),
          section: new FormControl({ value: "", disabled: true }, [
            Validators.required
          ]),
          stream: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ]),
          status: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ])
        });
        this.isClassAdd = false;
        this.isClassDelete = false;
        this.isClassSectionAdd = false;
        this.isClassSectionDelete = false;
        this.isClassStreamAdd = true;
        this.isClassStreamDelete = false;
      } else {
        this.addClassForm = new FormGroup({
          name: new FormControl({ value: "", disabled: false }, [
            Validators.required,
            Validators.pattern(CLASS_REGEX)
          ]),
          code: new FormControl({ value: "", disabled: false }, [
            Validators.required,
            Validators.pattern(CODE_REGEX)
          ]),
          description: new FormControl({ value: "", disabled: false }),
          status: new FormControl({ value: "", disabled: false }, [
            Validators.required
          ])
        });
        this.isClassAdd = true;
        this.isClassDelete = false;
        this.isClassSectionAdd = false;
        this.isClassSectionDelete = false;
        this.isClassStreamAdd = false;
        this.isClassStreamDelete = false;
      }
    }
    if (option.IsDelete) {
      if (option.Type == "section") {
        this.classService.classSection().subscribe(
          classsection => {
            if (classsection.length > 0) {
              this.sectionDataSource.data = classsection;
              this.totalLengthSection = classsection.length;
            } else {
              this.snackBar.open("Please add Section to Class", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while fetching", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        );
        this.classService;
        this.isClassAdd = false;
        this.isClassDelete = false;
        this.isClassSectionAdd = false;
        this.isClassSectionDelete = true;
        this.isClassStreamAdd = false;
        this.isClassStreamDelete = false;
      } else if (option.Type == "stream") {
        this.classService.classStream().subscribe(
          classStream => {
            if (classStream.length > 0) {
              this.streamDataSource.data = classStream;
              this.totalLengthStream = classStream.length;
            } else {
              this.snackBar.open("Please add stream to class first", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while fetching", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        );
        this.isClassAdd = false;
        this.isClassDelete = false;
        this.isClassSectionAdd = false;
        this.isClassSectionDelete = false;
        this.isClassStreamAdd = false;
        this.isClassStreamDelete = true;
      } else {
        this.classService.class().subscribe(
          classes => {
            if (classes.length > 0) {
              this.classDataSource.data = classes;
              this.totalLength = classes.length;
            } else {
              this.snackBar.open("Please add class first", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            }
          },
          error => {
            this.snackBar.open("An error occured while fetching", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          }
        );
        this.isClassAdd = false;
        this.isClassDelete = true;
        this.isClassSectionAdd = false;
        this.isClassSectionDelete = false;
        this.isClassStreamAdd = false;
        this.isClassStreamDelete = false;
      }
    }
  }

  /**
   * addClass
   */
  public addClass() {
    if (this.addClassForm.valid) {
      let classModel = this.addClassForm.value;
      let classes = <Class>{
        Name: classModel.name,
        Code: classModel.code,
        Description: classModel.description,
        StatusId: classModel.status
      };
      this.classService.addclass(classes).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Class added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Class", "", {
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
   * deleteClass
   */
  public deleteClass(classId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Class?",
        message: "Do you want to delete this Class ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deleteclass(classId).subscribe(
          status => {
            if (status) {
              this.classService.class().subscribe(
                classes => {
                  if (classes.length > 0) {
                    this.classDataSource.data = classes;
                    this.totalLength = classes.length;
                  } else {
                    this.classDataSource.data = null;
                    this.totalLength = 0;
                  }
                },
                error => {
                  this.snackBar.open("An error occured while fetching", "", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 2000
                  });
                }
              );
              this.snackBar.open("Class deleted successfully !!!", "", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 2000
              });
            } else {
              this.snackBar.open("Not able to delete Class", "", {
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

  /**
   * addClassSection
   */
  public addClassSection() {
    if (this.addClassSectionForm.valid) {
      let classSectionModel = this.addClassSectionForm.value;
      let classSection = <ClassSection>{
        ClassId: classSectionModel.class,
        SectionId: classSectionModel.section,
        StatusId: classSectionModel.status
      };
      this.classService.addclasssection(classSection).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Section to Class added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Section to Class", "", {
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
   * deleteClassSection
   */
  public deleteClassSection(classSectionId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Section of Class?",
        message: "Do you want to delete this Section of Class ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deleteclasssection(classSectionId).subscribe(
          status => {
            if (status) {
              this.classService.classSection().subscribe(
                classsection => {
                  if (classsection.length > 0) {
                    this.sectionDataSource.data = classsection;
                    this.totalLengthSection = classsection.length;
                  } else {
                    this.sectionDataSource.data = null;
                    this.totalLengthSection = 0;
                  }
                },
                error => {
                  this.snackBar.open("An error occured while fetching", "", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 2000
                  });
                }
              );
              this.snackBar.open(
                "Section of Class deleted successfully !!!",
                "",
                {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                }
              );
            } else {
              this.snackBar.open("Not able to delete Section of Class", "", {
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

  /**
   * addClassStream
   */
  public addClassStream() {
    if (this.addClassStreamForm.valid) {
      let classStreamModel = this.addClassStreamForm.value;
      let classStream = <ClassStream>{
        ClassId: classStreamModel.class,
        SectionId: classStreamModel.section,
        StreamId: classStreamModel.stream,
        StatusId: classStreamModel.status
      };
      this.classService.addclassStream(classStream).subscribe(
        status => {
          if (status) {
            this.snackBar.open("Stream to Class added successfully !!!", "", {
              horizontalPosition: "center",
              verticalPosition: "top",
              duration: 2000
            });
          } else {
            this.snackBar.open("Not able to add Stream to Class", "", {
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
   * deleteClassStream
   */
  public deleteClassStream(classStreamId: Guid) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "250px",
      data: {
        name: "Delete Stream of Class?",
        message: "Do you want to delete this Stream of Class ?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.deleteclassStream(classStreamId).subscribe(
          status => {
            if (status) {
              this.classService.classStream().subscribe(
                classstream => {
                  if (classstream.length > 0) {
                    this.streamDataSource.data = classstream;
                    this.totalLengthStream = classstream.length;
                  } else {
                    this.streamDataSource.data = null;
                    this.totalLengthStream = 0;
                  }
                },
                error => {
                  this.snackBar.open("An error occured while fetching", "", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 2000
                  });
                }
              );
              this.snackBar.open(
                "Stream of Class deleted successfully !!!",
                "",
                {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                }
              );
            } else {
              this.snackBar.open("Not able to delete Stream of Class", "", {
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

  /**
   * classChanged
   */
  public classChanged() {
    let sectionControl = <FormControl>this.addClassStreamForm.get("section");
    let selectedClass = (<FormControl>this.addClassStreamForm.get("class"))
      .value;
    this.sectionList = new Array<Section>();
    this.classService.section(selectedClass).subscribe(
      sections => {
        sectionControl.setValue("");
        this.sectionList = sections;
        if (this.sectionList.length > 0) {
          sectionControl.enable();
        } else {
          sectionControl.disable();
        }
      },
      error => {
        this.snackBar.open(
          "An error occured while getting sections of class",
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
}
