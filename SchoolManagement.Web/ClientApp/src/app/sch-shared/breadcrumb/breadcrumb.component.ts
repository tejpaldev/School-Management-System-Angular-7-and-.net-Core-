import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Breadcrumb } from "../../models/breadcrumb.model";
import { map, filter, scan, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    tap(event => this.buildBreadCrumb(this.activatedRoute.root))
  );
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = "",
    breadcrumbs: Array<Breadcrumb> = []
  ): Array<Breadcrumb> {
    // If no routeConfig is avalailable we are on the root path
    const label = route.routeConfig ? route.routeConfig.data["title"] : "Home";
    const path = route.routeConfig ? route.routeConfig.path : "";
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
