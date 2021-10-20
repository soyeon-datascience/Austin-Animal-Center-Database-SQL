import { Component,  OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { TableDataService } from "../table-data.service";
import { TableInsertComponent } from "../table-insert/table-insert.component";


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {

  table = '';
  tableData;
  dataSource;
  columns: string[];
  isLoading = true;
  totalRows;
  column_values: {};
  rowsPerPage = 10;
  pageIndex = 0;
  isDmlApplicable = false;
  pageSizeOptions = [5, 10, 15, 20, 25, 30];

  constructor(private route: ActivatedRoute, private router: Router, private tableDataService: TableDataService, private _snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.table = this.route.snapshot.queryParams.db_obj;

    if (this.table) {
      console.log('It has table name ' + this.table);
      this.isDmlApplicable = this.table === 'intake' || this.table === 'outcome' || this.table === 'animal_info' || this.table === 'intake_and_outcome_join';
      this.tableDataService.getTableData(this.table, this.rowsPerPage, this.pageIndex)
        .subscribe(responseData => {
          this.tableData = responseData.tableData;
          this.columns = responseData.columns;
          if (this.table === 'intake' || this.table === 'outcome' || this.table === 'animal_info') {
            this.tableData.forEach(element => {
              element["menu"] = element["animal_id_intake"];
            });
            this.columns.unshift("menu");
          }

          this.dataSource = new MatTableDataSource(Object.values(this.tableData));

          this.totalRows = responseData.totalItems;
          this.column_values = responseData.column_values;
          console.log(this.column_values);
          console.log(this.columns);
          this.isLoading = false;
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  onPageChanged(pageData: PageEvent) {
    this.isLoading = true;
    this.pageIndex = pageData.pageIndex + 1;
    this.rowsPerPage = pageData.pageSize;
    this.tableDataService.getTableData(this.table, this.rowsPerPage, this.pageIndex)
      .subscribe(responseData => {
        this.tableData = responseData.tableData;
        this.dataSource = new MatTableDataSource(Object.values(this.tableData));
        console.log(responseData);
        this.columns = responseData.columns;
        this.totalRows = responseData.totalItems;
        console.log(this.columns);
        this.isLoading = false;
    });
  }

  isMegaTable() {
    return this.table === 'in_out_mega' || this.table === 'intake_and_outcome_join';
  }

  search(value: {column: string, value: string}) {
    console.log(value);
    this.isLoading = true;
    this.pageIndex=0;
    this.tableDataService.searchTableData(value, this.table, this.rowsPerPage, this.pageIndex)
      .subscribe(responseData => {
        console.log(this.table);
        console.log("SEARCH")
        this.tableData = responseData.tableData;
        console.log(responseData);
        this.columns = responseData.columns;
        this.totalRows = responseData.totalItems;
        console.log(this.columns);
        if (this.table === 'intake' || this.table === 'outcome' || this.table === 'animal_info') {
          this.tableData.forEach(element => {
            element["menu"] = element["animal_id_intake"];
          });
          this.columns.unshift("menu");
        }
        console.log(this.tableData)
        this.dataSource = new MatTableDataSource(Object.values(this.tableData));
        
        this.isLoading = false;
      },
      error => {
        this.openSnackBar(error.error.message, "OK");
        this.isLoading = false;
      });
  }

  insertRow(row: {}) {
    this.tableDataService.insertRow(row, this.table)
      .subscribe(responseData => {
        console.log(responseData);
      },error => {
        console.log(error);
        console.log(error.error.error_msg);
        this._snackBar.open(error.error.error_msg, "OK");
      });
  }

  updateRow(element: any) {
    if ( this.table === 'intake' || this.table === 'outcome' ) {
      this.column_values[this.table+"_number"] = element[this.table+"_number"];
    }
    Object.keys(this.column_values).forEach(column => {
      this.column_values[column] = element[column];
    });
    console.log(this.column_values)
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TableInsertComponent,{
      width: '500px',
      disableClose: true,
      data: {
        table: this.table,
        column_values: this.column_values,
        mode: 'update'
      }
    });
    dialogRef.afterClosed().subscribe(updatedRow => {
      if (updatedRow) {
        console.log(updatedRow);
        this.updateRowInDB(updatedRow);
      }
    });
  }

  updateRowInDB(updatedRow: {}) {
    this.tableDataService.updateRow(updatedRow, this.table)
      .subscribe(responseData => {
        console.log("RESPONSE");
        this.reload();
      },error => {
        console.log(error);
        console.log(error.error.error_msg);
        this._snackBar.open(error.error.error_msg, "OK");
      });
  }

  deleteRow(element: any) {
    let deleteParameters = {};
    deleteParameters["animal_id_intake"] = element["animal_id_intake"];
    if (this.table === 'intake' || this.table === 'outcome') {
      deleteParameters[this.table+"_number"] = element[this.table+"_number"];
    }
    this.tableDataService.deleteRow({data: element}, this.table, deleteParameters)
    .subscribe(responseData => {
      console.log("RESPONSE");
      this.reload();
    },error => {
      console.log(error);
      console.log(error.error.error_msg);
      this._snackBar.open(error.error.error_msg, "OK");
    });
  }

  formatDataValue(value: string | number) {
    if (typeof value === 'string') {
      var regex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}).000Z/;
      value = value.replace(regex, "$1 $2");
      // console.log(value);
    }
    return value;
  }

  reload() {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/data'], { queryParams: { db_obj: this.table } });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getNumberOfRows() {
    return Array(this.rowsPerPage);
  }
}
