import { Component, OnInit } from "@angular/core";
import { Option } from "../../models/option-role.model";

@Component({
  selector: "school-class-config",
  templateUrl: "./class-config.component.html",
  styleUrls: ["./class-config.component.scss"]
})
export class ClassConfigComponent implements OnInit {
  streamOption: Option;
  sectionOption: Option;
  classOption: Option;
  isClass: boolean;
  isSection: boolean;
  isStream: boolean;
  constructor() {
    this.isClass = false;
    this.isSection = false;
    this.isStream = false;
  }

  ngOnInit() {}

  /**
   * addClass
   */
  public addClass() {
    this.classOption = <Option>{
      IsAdd: true,
      IsDelete: false,
      Type: "class"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

  /**
   * addClassSection
   */
  public addClassSection() {
    this.classOption = <Option>{
      IsAdd: true,
      IsDelete: false,
      Type: "section"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

  /**
   * addClassStream
   */
  public addClassStream() {
    this.classOption = <Option>{
      IsAdd: true,
      IsDelete: false,
      Type: "stream"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

  /**
   * deleteClass
   */
  public deleteClass() {
    this.classOption = <Option>{
      IsAdd: false,
      IsDelete: true,
      Type: "class"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

  /**
   * deleteClassSection
   */
  public deleteClassSection() {
    this.classOption = <Option>{
      IsAdd: false,
      IsDelete: true,
      Type: "section"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

   /**
   * deleteClassStream
   */
  public deleteClassStream() {
    this.classOption = <Option>{
      IsAdd: false,
      IsDelete: true,
      Type: "stream"
    };
    this.isClass = true;
    this.isSection = false;
    this.isStream = false;
  }

  /**
   * addSection
   */
  public addSection() {
    this.sectionOption = <Option>{
      IsAdd: true,
      IsDelete: false
    };
    this.isClass = false;
    this.isSection = true;
    this.isStream = false;
  }

  /**
   * deleteSection
   */
  public deleteSection() {
    this.sectionOption = <Option>{
      IsAdd: false,
      IsDelete: true
    };
    this.isClass = false;
    this.isSection = true;
    this.isStream = false;
  }

  /**
   * addStream
   */
  public addStream() {
    this.streamOption = <Option>{
      IsAdd: true,
      IsDelete: false
    };
    this.isClass = false;
    this.isSection = false;
    this.isStream = true;
  }

  /**
   * deleteStream
   */
  public deleteStream() {
    this.streamOption = <Option>{
      IsAdd: false,
      IsDelete: true
    };
    this.isClass = false;
    this.isSection = false;
    this.isStream = true;
  }
}
