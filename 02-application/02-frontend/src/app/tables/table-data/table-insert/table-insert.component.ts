import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: '<app-table-insert>',
  templateUrl: './table-insert.component.html',
  styleUrls: ['./table-insert.component.css']
})
export class TableInsertComponent implements OnInit {

  form: FormGroup;
  objectKeys = Object.keys;
  mode: 'insert' | 'update';

  constructor(
     @Inject(MAT_DIALOG_DATA) public data: {table: string, column_values: {}, mode: 'insert' | 'update'},
     private dialogRef: MatDialogRef<TableInsertComponent>) {}

  ngOnInit(): void {
    console.log(this.data.column_values);
    this.mode = this.data.mode;
    this.form = this.toFormGroup(this.data.column_values);
    if (this.mode === 'update') {
      this.form.controls['animal_id_intake'].disable();
      if (this.data.table === 'intake') {
        this.form.controls['intake_number'].disable();
      }
      if (this.data.table === 'outcome') {
        this.form.controls['outcome_number'].disable();
      }
    }
  }

  toFormGroup(data_types: {} ) {
    const group: any = {};
    Object.keys(data_types).forEach(column => {
      if (column === 'animal_id_intake') {
        group[column] = new FormControl(this.data.column_values[column], {validators: [Validators.required, Validators.maxLength(7)]})
      } else if ((column) === 'outcome_subtype' ) {
        group[column] = new FormControl(this.data.column_values[column])
      } else {
        group[column] = new FormControl(this.data.column_values[column], {validators: [Validators.required]})
      }
    });
    // questions.forEach(question => {
    //   group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
    //                                           : new FormControl(question.value || '');
    // });
    return new FormGroup(group);
  }


  isThisColNumeric(data_type: string) {
    return data_type === 'smallint' || data_type === 'tinyint' || data_type === 'int';
  }

  close(){
    this.dialogRef.close();
  }
  submit(){
    if ( this.form.invalid ) {
      return;
    }
    if (this.mode === 'update') {
      this.form.controls['animal_id_intake'].enable();
      if (this.data.table === 'intake') {
        this.form.controls['intake_number'].enable();
      }
      if (this.data.table === 'outcome') {
        this.form.controls['outcome_number'].enable();
      }
    }
    console.log(this.form);
    this.dialogRef.close({
      data: this.form.value
    });

  }

  getTitle() {
    return this.mode === 'insert' ? `Insert into ${this.data.table}` : `Update ${this.data.table}`;
  }

  getButtonText() {
    return this.mode === 'insert' ? 'Insert': 'Update';
  }
}
