import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'school-forgetpwd',
  templateUrl: './forgetpwd.component.html',
  styleUrls: ['./forgetpwd.component.scss']
})
export class ForgetpwdComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  forgetpwd() {
    this.router.navigate(['/login']);
  }

}
