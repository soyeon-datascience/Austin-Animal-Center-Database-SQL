import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  constructor(private http: HttpClient) {}
  getTableData(db_obj: string, limit: number, pageIndex: number): Observable<{totalItems: number, columns: [], tableData: {}, column_values: {}}> {
    return this.http.get<{totalItems: number, columns: [], tableData: {}, column_values: {}}>(`http://localhost:3000/api/${db_obj}/pagination?page=${pageIndex}&limit=${limit}`);
  }
  getSummaryData() {
    return this.http.get<{animals_count: [], animals_type_count: [], outcome_type_count: []}>('http://localhost:3000/api/summary');
  }

  searchTableData(values: {column: string, value: string}, tableName: string, limit: number, pageIndex: number) {
    //console.log(values)
    return this.http.get<{totalItems: number, columns: [], tableData: {}}>(`http://localhost:3000/api/search/${tableName}/${values.column}/${values.value}`);
  }

  insertRow(row: {}, tableName: string) {
    return this.http.post<{message: string}>(`http://localhost:3000/api/insert/${tableName}`, row);
  }

  updateRow(row: {}, tableName: string) {
    return this.http.post<{message: string}>(`http://localhost:3000/api/update/${tableName}`, row);
  }

  deleteRow(row: {}, tableName: string, deleteParameters: {}) {
    console.log("Going to send ");
    console.log(row);
    let urlParameters = '';
    Object.keys(deleteParameters).forEach((element, i, arr) => {
      urlParameters += `${element}=${deleteParameters[element]}`
      if (i !== arr.length - 1) {
        urlParameters += "&"
      }
    });
    return this.http.delete<{message: string}>(`http://localhost:3000/api/delete/${tableName}?${urlParameters}`, row);
  }
}
