import { SearchComponent } from "../../sch-shared/search/search.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatStepper, MatDialog, MatSnackBar } from "@angular/material";

import { Class, Section, Stream } from "../../models/class";
import {
  BloodGroup,
  Category,
  Gender,
  ParentType,
  Religion
} from "../../models/master";
import { Student } from "../../models/student";
import { Busroute, Location } from "../../models/transport";
import { ClassService } from "../../services/class.service";
import { MasterDataService } from "../../services/master-data.service";
import { StudentService } from "../../services/student.service";
import { TransportService } from "../../services/transport.service";
import { Parent } from "../../models/parent";
import { ParentService } from "../../services/parent.service";
import { Router } from "@angular/router";
import { StudentType } from "../../models/student-type.model";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const WORD_REGEX = /^[A-z]+$/;
const PHONE_REGEX = /^[789]\d{9}$/;

@Component({
  selector: "school-admission",
  templateUrl: "./admission.component.html",
  styleUrls: ["./admission.component.scss"]
})
export class AdmissionComponent implements OnInit {
  public parenttypes: Array<ParentType>;
  public religions: Array<Religion>;
  public genders: Array<Gender>;
  public categories: Array<Category>;
  public bloodgroups: Array<BloodGroup>;
  public classes: Array<Class>;
  public sections: Array<Section>;
  public streams: Array<Stream>;
  public locations: Array<Location>;
  public busroutes: Array<Busroute>;
  public studentType: Array<StudentType>;

  public transportFormGroup: FormGroup;
  public contactFormGroup: FormGroup;
  public studentFormGroup: FormGroup;
  public classFormGroup: FormGroup;
  public parentFormGroup: FormGroup;
  public registeredStu: Student;
  public IsSubmitted: boolean;
  @ViewChild("admissionStepper") admissionStepper: MatStepper;

  constructor(
    private masterDataService: MasterDataService,
    private classDataService: ClassService,
    private transportService: TransportService,
    private studentService: StudentService,
    private parentService: ParentService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.IsSubmitted = false;
    this.bloodgroups = new Array<BloodGroup>();
    this.masterDataService.bloodGroup().subscribe(
      bloodgroups => {
        if (bloodgroups && bloodgroups.length > 0) {
          this.bloodgroups = bloodgroups;
        } else {
          this.snackBar.open("No data available for Blood Group", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Blood Group", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.genders = new Array<Gender>();
    this.masterDataService.gender().subscribe(
      gender => {
        if (gender && gender.length > 0) {
          this.genders = gender;
        } else {
          this.snackBar.open("No data available for Gender", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Gender", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.categories = new Array<Category>();
    this.masterDataService.category().subscribe(
      category => {
        if (category && category.length > 0) {
          this.categories = category;
        } else {
          this.snackBar.open("No data available for Category", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Category", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.religions = new Array<Religion>();
    this.masterDataService.religion().subscribe(
      religion => {
        if (religion && religion.length > 0) {
          this.religions = religion;
        } else {
          this.snackBar.open("No data available for Religion", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Religion", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.parenttypes = new Array<ParentType>();
    this.masterDataService.parentType().subscribe(
      parenttype => {
        if (parenttype && parenttype.length > 0) {
          this.parenttypes = parenttype;
        } else {
          this.snackBar.open("No data available for Parent Type", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Parent Type", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.classes = new Array<Class>();
    this.classDataService.class().subscribe(
      classes => {
        if (classes && classes.length > 0) {
          this.classes = classes;
        } else {
          this.snackBar.open("No data available for Class", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Class", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.locations = new Array<Location>();
    this.transportService.location().subscribe(
      locations => {
        if (locations && locations.length > 0) {
          this.locations = locations;
        } else {
          this.snackBar.open("No data available for Locations", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Locations", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
    this.studentType = new Array<StudentType>();
    this.studentService.studentType().subscribe(
      studentType => {
        if (studentType && studentType.length > 0) {
          this.studentType = studentType;
        } else {
          this.snackBar.open("No data available for Student Type", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while getting Student Type", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  ngOnInit() {
    this.studentFormGroup = new FormGroup({
      aadharno: new FormControl({ value: "", disabled: false }),
      studenttype: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      transport: new FormControl({ value: true, disabled: false }, [
        Validators.required
      ]),
      firstname: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ]),
      middlename: new FormControl({ value: "", disabled: false }, [
        Validators.pattern(WORD_REGEX)
      ]),
      lastname: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ]),
      dateofbirth: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      bloodgroup: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      category: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      cast: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      religion: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      gender: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      nationality: new FormControl({ value: "Indian", disabled: false }, [
        Validators.required
      ]),
      reference: new FormControl({ value: "", disabled: false })
    });
    this.classFormGroup = new FormGroup({
      previousschool: new FormControl({ value: "", disabled: false }, []),
      previousclass: new FormControl({ value: "", disabled: false }, []),
      class: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      stream: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ]),
      section: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ])
    });
    let selected = <ParentType>{
      Id: "28B308FE-D722-4148-865D-EBD9AC5D7AAF",
      Name: "Mother"
    };
    this.parentFormGroup = new FormGroup({
      parenttype: new FormControl({ value: selected.Id, disabled: false }, []),
      parents: new FormArray([this.CreateParentForm(selected, true)])
    });
    this.transportFormGroup = new FormGroup({
      location: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ]),
      busroute: new FormControl({ value: "", disabled: true }, [
        Validators.required
      ])
    });
  }

  private CreateParentForm(
    parentType: ParentType,
    primaryContact: boolean
  ): FormGroup {
    let parentForm = new FormGroup({
      title: new FormControl({ value: parentType.Name, disabled: false }),
      parenttype: new FormControl({ value: parentType.Id, disabled: false }),
      primarycontact: new FormControl({
        value: primaryContact,
        disabled: false
      }),
      name: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ]),
      occupation: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.pattern(WORD_REGEX)
      ]),
      contact: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(PHONE_REGEX)
      ]),
      email: new FormControl({ value: "abc@abc.com", disabled: false }, [
        Validators.email,
        Validators.pattern(EMAIL_REGEX)
      ]),
      address: new FormControl({ value: "", disabled: false }, [
        Validators.required
      ])
    });
    return parentForm;
  }

  /**
   * addParent
   */
  public addParent() {
    let parentsArray = <FormArray>this.parentFormGroup.get("parents");
    let parentType = (<FormControl>this.parentFormGroup.get("parenttype"))
      .value;
    let selected = this.parenttypes.find(x => x.Id == parentType);
    let parentIndex = parentsArray.controls.findIndex(
      x => x.get("title").value == selected.Name.trim()
    );
    if (parentIndex === -1)
      parentsArray.push(this.CreateParentForm(selected, false));
  }

  /**
   * removeParent
   */
  public removeParent(i: number) {
    (<FormArray>this.parentFormGroup.get("parents")).removeAt(i);
  }

  /**
   * classChanged
   */
  public classChanged() {
    let sectionControl = <FormControl>this.classFormGroup.get("section");
    let streamControl = <FormControl>this.classFormGroup.get("stream");
    let selectedClass = (<FormControl>this.classFormGroup.get("class")).value;
    this.sections = new Array<Section>();
    this.classDataService.section(selectedClass).subscribe(
      sections => {
        sectionControl.setValue("");
        this.sections = sections;
        if (this.sections.length > 0) {
          streamControl.disable();
          streamControl.setValue("");
          sectionControl.enable();
        } else {
          sectionControl.disable();
          this.classDataService.stream(selectedClass).subscribe(
            streams => {
              streamControl.setValue("");
              this.streams = streams;
              if (this.streams.length > 0) streamControl.enable();
              else streamControl.disable();
            },
            error => {
              this.snackBar.open(
                "An error occured while getting Streams of class",
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
      },
      error => {
        this.snackBar.open(
          "An error occured while getting Sections of class",
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

  /**
   * sectionChanged
   */
  public sectionChanged() {
    let selectedClass = (<FormControl>this.classFormGroup.get("class")).value;
    let selectedSection = (<FormControl>this.classFormGroup.get("section"))
      .value;
    let streamControl = <FormControl>this.classFormGroup.get("stream");
    this.streams = new Array<Stream>();
    this.classDataService.stream(selectedClass, selectedSection).subscribe(
      streams => {
        streamControl.setValue("");
        this.streams = <Array<Stream>>streams;
        if (this.streams.length > 0) streamControl.enable();
        else streamControl.disable();
      },
      error => {
        this.snackBar.open(
          "An error occured while getting Streams of class",
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

  /**
   * locationChanged
   */
  public locationChanged() {
    let selectedLocation = (<FormControl>(
      this.transportFormGroup.get("location")
    )).value;
    let busrouteControl = <FormControl>this.transportFormGroup.get("busroute");
    this.busroutes = new Array<Busroute>();
    this.transportService.Busroute(selectedLocation).subscribe(
      busroutes => {
        busrouteControl.setValue("");
        this.busroutes = busroutes;
        if (this.busroutes.length > 0) {
          busrouteControl.enable();
        } else {
          busrouteControl.disable();
          this.snackBar.open("No Bus route for location", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open(
          "An error occured while getting Bus route for location",
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

  /**
   * transportChange
   */
  public transportChange() {
    let transportControl = <FormControl>this.studentFormGroup.get("transport");
    let locationControl = <FormControl>this.transportFormGroup.get("location");
    let busrouteControl = <FormControl>this.transportFormGroup.get("busroute");
    if (transportControl.value) locationControl.enable();
    else {
      locationControl.setValue("");
      busrouteControl.setValue("");
      locationControl.disable();
      busrouteControl.disable();
    }
  }

  /**
   * register
   */
  public register() {
    const studentModel = this.studentFormGroup.value;
    const classModel = this.classFormGroup.value;
    let selectedClass = this.classes.find(x => x.Id === classModel.class);
    const parentModel = this.parentFormGroup.value;
    const transportModel = this.transportFormGroup.value;
    let student = <Student>{
      AadharNumber: studentModel.aadharno,
      Nationality: studentModel.nationality,
      Firstname: studentModel.firstname,
      Middlename: studentModel.middlename,
      Lastname: studentModel.lastname,
      Dateofbirth: studentModel.dateofbirth,
      GenderId: studentModel.gender,
      BloodGroupId: studentModel.bloodgroup,
      CategoryId: studentModel.category,
      ReligionId: studentModel.religion,
      StudentTypeId: studentModel.studenttype,
      Reference: studentModel.reference,
      Cast: studentModel.cast,
      PreviousSchoolName: classModel.previousschool,
      PreviousSchoolClass: classModel.previousclass,
      ClassId: classModel.class,
      ClassCode: selectedClass.Code,
      SectionId: classModel.section,
      StreamId: classModel.stream,
      BusRouteId: transportModel.busroute
    };
    this.studentService.registerStudent(student).subscribe(
      student => {
        if (student) {
          this.registeredStu = student;
          let parentArray = new Array<Parent>();
          parentModel.parents.map(x => {
            let parent = <Parent>{
              Address: x.address,
              Contact: x.contact,
              Email: x.email,
              IsPrimaryContact: x.primarycontact,
              Name: x.name,
              Occupation: x.occupation,
              ParentTypeId: x.parenttype,
              StudentId: student.Id
            };
            parentArray.push(parent);
          });
          this.parentService.registerParent(parentArray).subscribe(
            parentIds => {
              if (parentIds.length === parentArray.length) {
                // this.router.navigate(["/dashboard"]);
                this.IsSubmitted = true;
              } else {
                this.snackBar.open(
                  "Adding parent for registered student failed",
                  "",
                  {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 2000
                  }
                );
              }
            },
            error => {
              this.snackBar.open(
                "An error occured while saving parents to registered student.",
                "",
                {
                  horizontalPosition: "center",
                  verticalPosition: "top",
                  duration: 2000
                }
              );
            }
          );
        } else {
          this.snackBar.open("Student registration failed", "", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 2000
          });
        }
      },
      error => {
        this.snackBar.open("An error occured while registering Student", "", {
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 2000
        });
      }
    );
  }

  /**
   * countinue
   */
  public countinue() {
    this.router.navigate(["/dashboard"]);
  }

  /**
   * searchReference
   */
  public searchReference() {
    let dialogRef = this.dialog.open(SearchComponent, {
      data: {
        name: "Search Student"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentFormGroup.patchValue({
          reference: result.RegistrationNo
        });
      }
    });
  }
}
