import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalVariableService } from '../../services/global-variable.service';

@Component({
  selector: 'school-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean;
  public name: string;
  constructor(private router: Router, private globalVar: GlobalVariableService) { }

  ngOnInit(): void {
    this.name = "Guest";
    this.globalVar.isUserLoggedIn.subscribe(isLogged => {
      this.isLoggedIn = isLogged;
    });
  }

  /**
   * logo
   */
  public logo() {
    this.router.navigate(["/"]);
  }

  /**
   * logout
   */
  public logout() {
    sessionStorage.clear();
    this.globalVar.setAthentication(false);
    this.router.navigate(["/"]);
  }
}
