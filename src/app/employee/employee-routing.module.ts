import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeAddComponent } from "./employee-add/employee-add.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { EmployeePageComponent } from "./employee-page/employee-page.component";

const employee_routes: Routes = [
  {
    path: '',
    component: EmployeePageComponent
  }, {
    path: 'add',
    component: EmployeeAddComponent
  }, {
    path: 'detail',
    component: EmployeeDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(employee_routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule { }