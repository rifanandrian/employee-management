import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface employee {
  "username": string,
  "firstname": string,
  "lastname": string,
  "email": string,
  "birthdate": string,
  "basicSalary": number,
  "status": string,
  "group": string,
  "description": string,
}

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {

  public data: any;
  public tempData: employee[];

  public limit = 10;
  public currPage = 1;
  public tableSizes = [5, 10, 15, 25];
  public searchValue = '';


  public showFilter = false;
  public sorting = Array(2).fill('');

  public faChevronLeft = faChevronLeft;

  constructor(
    private router: Router
  ) {
    const string = sessionStorage.getItem('data');
    this.data = JSON.parse(string!);
    this.tempData = this.data;
  }

  ngOnInit() {
    this.subsribePreviewAddStock();
  }

  subsribePreviewAddStock() {
    const data = JSON.parse(sessionStorage.getItem('filterData')!);
    if (!!data) {
      this.tempData = data['data'];
      this.currPage = data['page'];
      this.limit = data['limit'];
      this.sorting = data['sorting'];
      this.searchValue = data['searchValue'];

      if (!this.sorting.includes('')) {
        this.sortData(this.sorting[0]);
      }
    }
  }

  sortData(attr: string) {
    switch (attr) {
      case 'username':
        if (this.sorting[1] === 'ASC') {
          this.tempData.sort((a, b) => { return (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0); })
        } else {
          this.tempData.sort((a, b) => { return (b.username > a.username) ? 1 : ((a.username > b.username) ? -1 : 0); })
        }
        break;
      case 'firstname':
        if (this.sorting[1] === 'ASC') {
          this.tempData.sort((a, b) => { return (a.firstname > b.firstname) ? 1 : ((b.firstname > a.firstname) ? -1 : 0); })
        } else {
          this.tempData.sort((a, b) => { return (b.firstname > a.firstname) ? 1 : ((a.firstname > b.firstname) ? -1 : 0); })
        }
        break;
      case 'group':
        if (this.sorting[1] === 'ASC') {
          this.tempData.sort((a, b) => { return (a.group > b.group) ? 1 : ((b.group > a.group) ? -1 : 0); })
        } else {
          this.tempData.sort((a, b) => { return (b.group > a.group) ? 1 : ((a.group > b.group) ? -1 : 0); })
        }
        break;
      case 'email':
        if (this.sorting[1] === 'ASC') {
          this.tempData.sort((a, b) => { return (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0); })
        } else {
          this.tempData.sort((a, b) => { return (b.email > a.email) ? 1 : ((a.email > b.email) ? -1 : 0); })
        }
        break;
      default:
        break;
    }
  }

  onSort(field: string) {
    this.sorting[1] = this.sorting[0] !== field ? 'ASC' : (this.sorting[1] === 'ASC' ? 'DESC' : 'ASC');
    this.sorting[0] = field;
    this.sortData(field);
  }

  searchUsername(event: any) {
    const value = event.target.value;
    if (value.length > 1) {
      let result = this.tempData.filter(x => x.username.includes(value))
      this.searchValue = value;
      this.currPage = 1;
      this.tempData = result;
    } else {
      this.tempData = this.data;
    }
  }

  onTableSizeChange(event: any): void {
    this.limit = event.target.value;
    this.currPage = 1;
  }

  moveTo(params: string) {
    if (params === 'add') {
      this.router.navigateByUrl('employee/add');
    } else if (params === 'menu') {
      sessionStorage.removeItem('filterData');
      sessionStorage.removeItem('dataUser');
      this.router.navigateByUrl('');
    }
  }

  action(params: object, action: string) {
    sessionStorage.setItem('dataUser', JSON.stringify(params));
    if (this.tempData.length !== this.data.length) {
      const filterData = {
        "data": this.tempData,
        "page": this.currPage,
        "limit": this.limit,
        "sorting": this.sorting,
        "searchValue": this.searchValue
      }
      sessionStorage.setItem('filterData', JSON.stringify(filterData));
    }
    if (action === 'edit') {
      this.router.navigateByUrl('employee/add');
    } else if (action === 'detail') {
      this.router.navigateByUrl('employee/detail');
    }
  }

  delete(params: any) {
    const index = this.tempData.findIndex(o => {
      return o.username === params;
    })

    if (index !== 1) {
      this.tempData.splice(index, 1);
      this.data.splice(index, 1);
      sessionStorage.setItem('data', JSON.stringify(this.data));

      if (this.tempData.length === 0) {
        this.tempData = this.data
      }
    };
  }

}
