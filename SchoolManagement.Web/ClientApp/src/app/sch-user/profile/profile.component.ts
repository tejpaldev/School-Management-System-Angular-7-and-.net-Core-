import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATEPICKER_VALIDATORS, MatOption, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const WORD_REGEX = /^[A-z]+$/;
const PHONE_REGEX = /^[789]\d{9}$/;

@Component({
  selector: 'school-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public isLinear = false;
  public genders: Array<any>;
  public profileFormGroup: FormGroup;
  public userFormGroup: FormGroup;
  @ViewChild('profileStepper') profileStepper: MatStepper;
  constructor(private _formBuilder: FormBuilder) {
    this.genders = new Array<any>();
    this.genders.push({ value: 'M', viewValue: 'Male' });
    this.genders.push({ value: 'F', viewValue: 'Female' });
  }

  ngOnInit() {
    this.profileFormGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(WORD_REGEX)]),
      middleName: new FormControl('', Validators.pattern(WORD_REGEX)),
      lastName: new FormControl('', [Validators.required, Validators.pattern(WORD_REGEX)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', Validators.required)
    });
    this.userFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      contact: new FormControl('', [Validators.required, Validators.pattern(PHONE_REGEX)]),
    });
  }

  /**
   * GetSelectedGender
   */
  public GetSelectedGender(id: any): string {
    console.log(id);
    let filterItem = this.genders.filter((element, index, array) => {
      if (element.value === id)
        return true;
      else
        return false;
    })[0];
    if (filterItem !== undefined)
      return filterItem.text;
  }

  profileSave() {
    if (this.profileFormGroup.valid) {
      let next = new MatStepperNext(this.profileStepper);
      next._stepper.next();
    }
  }

  userSave() {
    if (this.userFormGroup.valid) {
      let next = new MatStepperNext(this.profileStepper);
      next._stepper.next();
    }
  }
}
