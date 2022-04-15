import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faClose } from '@fortawesome/free-solid-svg-icons';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  public dataToShow?: Employee;
  public faCalendar = faCalendar;
  public faClose = faClose;

  constructor(
    private router: Router
  ) {
    if (!!sessionStorage.getItem('dataUser')) {
      this.dataToShow = JSON.parse(sessionStorage.getItem('dataUser') || '{}');
    }
  }

  ngOnInit() {
  }

  moveTo(params: string) {
    if (params === 'cancel') {
      this.router.navigateByUrl('employee');
      if (!!sessionStorage.getItem('dataUser')) {
        sessionStorage.removeItem('dataUser');;
      }
    }
  }
}
