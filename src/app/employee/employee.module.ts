import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { EmployeePageComponent } from './employee-page/employee-page.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
    FontAwesomeModule
  ],
  declarations: [
    EmployeePageComponent,
    EmployeeAddComponent,
    EmployeeDetailComponent
  ]
})
export class EmployeeModule { }
