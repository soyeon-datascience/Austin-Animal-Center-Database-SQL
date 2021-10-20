import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataService } from '../tables/table-data/table-data.service';

@Component({
  selector: '<app-summary>',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  animalsCountDisplayedColumns = ["animals_count"];
  animalsTypeCountDisplayedColumns = ["animal_type", "type_count", "percent"];
  outcomeTypeCountDisplayedColumns = ["outcome_type", "type_count", "percent"];
  totalAnimalsData: [];
  animalsCountdataSource;
  animalsTypeCountDataSource;
  outcomeTypeCountDataSource;
  isLoading;

  constructor(private tableDataService: TableDataService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.tableDataService.getSummaryData()
      .subscribe(responseData => {
        this.totalAnimalsData = responseData.animals_count;
        this.animalsCountdataSource = new MatTableDataSource(Object.values(this.totalAnimalsData));
        this.animalsTypeCountDataSource = new MatTableDataSource(Object.values(responseData.animals_type_count));
        this.outcomeTypeCountDataSource = new MatTableDataSource(Object.values(responseData.outcome_type_count));
        console.log(responseData);
        this.isLoading = false;
      });
  }

}
