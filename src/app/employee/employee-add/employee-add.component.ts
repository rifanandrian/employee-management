import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { faCalendar, faClose } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit, AfterContentChecked {
  public myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
    disableSince: { year: 0, month: 0, day: 0 }
  };

  // form
  public employeeForm: FormGroup;
  public unamePattern = '^[a-z0-9_-]{8,15}$';
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public empty = true;
  public groups = ['acarapis', 'spinor', 'jetports', 'hectoringly', 'enveloper', 'subhyoidean', 'festooned', 'composure', 'siderate', 'pharyngotomy',];
  public dataToEdit?: Employee;

  public dataSession = JSON.parse(sessionStorage.getItem('data') || '{}')

  public faCalendar = faCalendar;
  public faClose = faClose;

  get email() {
    return this.employeeForm.get('email');
  }

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.disableSince();

    if (!!sessionStorage.getItem('dataUser')) {
      this.dataToEdit = JSON.parse(sessionStorage.getItem('dataUser') || '{}');
    }

    this.employeeForm = new FormGroup({
      username: new FormControl(!!this.dataToEdit ? this.dataToEdit['username'] : '', [
        Validators.required,
      ]),
      firstName: new FormControl(!!this.dataToEdit ? this.dataToEdit['firstname'] : '', [
        Validators.required,
      ]),
      lastName: new FormControl(!!this.dataToEdit ? this.dataToEdit['lastname'] : '', [
        Validators.required,
      ]),
      email: new FormControl(!!this.dataToEdit ? this.dataToEdit['email'] : '', [
        Validators.email,
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      birthDate: new FormControl(!!this.dataToEdit ? this.dateModel(this.dataToEdit['birthdate']!) : '', [
        Validators.required,
      ]),
      basicSalary: new FormControl(!!this.dataToEdit ? this.dataToEdit['basicSalary'] : '', [
        Validators.required,
      ]),
      status: new FormControl(!!this.dataToEdit ? this.dataToEdit['status'] : '', [
        Validators.required,
      ]),
      group: new FormControl(!!this.dataToEdit ? this.dataToEdit['group'] : '', [
        Validators.required,
      ]),
      description: new FormControl(!!this.dataToEdit ? this.dateModel(this.dataToEdit['description']!) : '', [
        Validators.required,
      ])
    });

    this.employeeForm.valueChanges.subscribe(res => {
      this.empty = !!res.username && !!res.firstName && !!res.lastName && !!res.email && !!res.birthDate
        && !!res.basicSalary && !!res.status && !!res.group && !!res.description ? false : true;
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.select2').select2(); //initialize select2
    });
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  dateModel(param: Date) {
    let date = new Date(param);
    let model: IMyDateModel = { isRange: false, singleDate: { jsDate: date } };
    return model;
  }

  moveTo(params: string) {
    if (params === 'cancel') {
      this.router.navigateByUrl('employee');
      if (!!sessionStorage.getItem('dataUser')) {
        sessionStorage.removeItem('dataUser');;
      }
    }
  }

  disableSince() {
    let d: Date = new Date();
    d.setDate(d.getDate() + 1);
    let copy: IAngularMyDpOptions = this.getCopyOfOptions();
    copy.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    this.myDpOptions = copy;
  }

  getCopyOfOptions(): IAngularMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDpOptions));
  }

  clearDate(arg: string): void {
    if (arg === 'description') {
      this.employeeForm.patchValue({ description: '' });
    } else if (arg === 'birthDate') {
      this.employeeForm.patchValue({ birthDate: '' });
    }
  }

  saveData() {
    const dataEmployee = {
      "username": this.employeeForm.value['username'],
      "firstname": this.employeeForm.value['firstName'],
      "lastname": this.employeeForm.value['lastName'],
      "email": this.employeeForm.value['email'],
      "birthdate": this.employeeForm.value['birthDate']['singleDate']['jsDate'],
      "basicSalary": this.employeeForm.value['basicSalary'],
      "status": this.employeeForm.value['status'],
      "group": this.employeeForm.value['group'],
      "description": this.employeeForm.value['description']['singleDate']['jsDate'],
    }

    this.dataSession.push(dataEmployee)
    sessionStorage.setItem('data', JSON.stringify(this.dataSession));
  }

}
