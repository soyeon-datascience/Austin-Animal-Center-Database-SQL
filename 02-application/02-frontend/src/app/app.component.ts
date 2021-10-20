import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'display-db';
  db_obj_name = "";


  menuItemsClickedStatus =  {
    about: false,
    tables: false,
    views: false,
    audit: false
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

   constructor(private observer: BreakpointObserver, private router: Router) {}

  ngAfterViewInit(): void {
    console.log(this.sidenav);
    this.sidenav.mode = 'side';
    this.sidenav.open();
  }

   onMenuClicked(menu: string) {
     this.menuItemsClickedStatus[menu] = !this.menuItemsClickedStatus[menu];
     console.log(this.menuItemsClickedStatus);
   }

   showTableData(db_obj: string) {
    this.db_obj_name = db_obj;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/data'], { queryParams: { db_obj: db_obj } });
   }

   showAbout(pageName: string) {
     console.log(pageName);
   }

   navigate(comp: string) {
     this.db_obj_name = null;
     this.router.navigate([comp]);
   }

}
