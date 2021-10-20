import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TableInsertComponent } from "../table-insert/table-insert.component";

@Component({
  selector: 'app-table-dml',
  templateUrl: './table-dml.component.html',
  styleUrls: ['./table-dml.component.css']
})
export class TableDmlComponent implements OnInit {

  @Input() table: string;
  @Input() column_values: {};
  @Output() searchEvent = new EventEmitter<{column: string, value: string}>();
  @Output() insertEvent = new EventEmitter<{}>();
  @Output() seeAllEvent = new EventEmitter<null>();

  constructor(public dialog: MatDialog){}

  objectKeys = Object.keys;
  toSearchColumns: {};
  userEnteredValues: {};
  forms: FormArray;

  ngOnInit(): void {
    this.toSearchColumns = {...searchParameters[this.table]["to_search_columns"]};
    this.userEnteredValues = {...searchParameters[this.table]["user_entered_values"]};
    console.log(this.table);
  }

  search(column: string) {
    if (!this.userEnteredValues[column]) {
      return;
    }
    console.log(this.userEnteredValues[column]);
    this.searchEvent.emit({
      column: column,
      value: this.userEnteredValues[column]
    });
  }

  seeAll(){
    this.seeAllEvent.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TableInsertComponent,{
      width: '500px',
      disableClose: true,
      data: {
        table: this.table,
        column_values: this.column_values,
        mode: 'insert'
      }
    });
    dialogRef.afterClosed().subscribe(insertedRow => {
      if (insertedRow) {
        console.log(insertedRow);
        this.insertEvent.emit(insertedRow);
      }
    });
  }
  isinsertapplicable() {
    return this.table !== "intake_and_outcome_join"
  }
}

export const searchParameters = {
  'intake' : {
    to_search_columns: {
      animal_id: "Animal ID",
      intake_datetime: "Intake Date"
    },
    user_entered_values: {
      animal_id: "",
      intake_datetime: ""
    }
  },
  'outcome': {
    to_search_columns: {
      animal_id: "Animal ID",
      outcome_datetime: "Outcome Date"
    },
    user_entered_values: {
      animal_id: "",
      intake_datetime: ""
    }
  },
  'animal_info': {
    to_search_columns: {
      animal_id: "Animal ID"
    },
    user_entered_values: {
      animal_id: "",
      intake_datetime: ""
    }
  },
  'intake_and_outcome_join': {
    to_search_columns: {
      animal_id: "Animal ID",
      intake_datetime: "Intake Date",
      outcome_datetime: "Outcome Date"
    },
    user_entered_values: {
      animal_id: "",
      intake_datetime: ""
    }
  }
 
}

