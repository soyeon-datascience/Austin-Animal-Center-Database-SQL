import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './about/data/data.component';
import { ProjectComponent } from './about/project/project.component';
import { SummaryComponent } from './summary/summary.component';
import { TableDataComponent } from './tables/table-data/table-data-list/table-data.component';

const routes: Routes = [
  {path: '', component: ProjectComponent},
  {path: 'data_about', component: DataComponent},
  {path: 'data', component: TableDataComponent},
  {path: 'summary', component: SummaryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
