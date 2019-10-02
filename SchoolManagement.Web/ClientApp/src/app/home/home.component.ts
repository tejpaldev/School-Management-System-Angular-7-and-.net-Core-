import { Router } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "school-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  items = [
    { class: "sch-home" },
    { class: "sch-home1" },
    // { class: "sch-home2" },
    { class: "sch-home3" },
    { class: "sch-home4" },
    // { class: "sch-home5" },
    // { class: "sch-home6" },
    { class: "sch-home7" },
    { class: "sch-home8" },
    { class: "sch-home9" }
  ];

  ngOnInit() {}

  /**
   * Login
   */
  public login() {
    this.router.navigate(["/login"]);
  }
}
