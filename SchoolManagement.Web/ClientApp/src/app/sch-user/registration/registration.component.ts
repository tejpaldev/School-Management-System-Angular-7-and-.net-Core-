import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatStepper, MatStepperNext } from '@angular/material';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../services/user.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const WORD_REGEX = /^[A-z]+$/;
const PHONE_REGEX = /^[789]\d{9}$/;

@Component({
  selector: 'school-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public formGroup: FormGroup;
  public formArray: FormArray;
  public hide: boolean;
  public isLinear: boolean;
  @ViewChild('registerStepper') registerStepper: MatStepper;
  constructor(private router: Router, public userService: UserService) {
    this.hide = true;
    this.isLinear = true;
  }

  ngOnInit() {
    this.formArray = new FormArray([new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(WORD_REGEX)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
      contact: new FormControl('', [Validators.required, Validators.pattern(PHONE_REGEX)]),
    }),
    new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    })]);
    this.formGroup = new FormGroup({ formArray: this.formArray });
  }

  register() {
    if (this.formArray.valid) {
      let next = new MatStepperNext(this.registerStepper);
      let user = new User("",
        this.formArray.value[0].username,
        this.formArray.value[1].password,
        this.formArray.value[0].email,
        this.formArray.value[0].contact);
      this.userService.register(user).subscribe(
        (success) => {
          if (success)
            next._stepper.next();
        },
        (error) => { },
        () => { });
    }
  }

  done(): void {
    this.router.navigate(['/login']);
  }
}
