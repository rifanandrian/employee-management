import { Routes } from '@angular/router';
import { MainMenuPageComponent } from "./main-menu-page/main-menu-page.component";

export const MENU_ROUTE: Routes = [
  {
    path: 'home',
    component: MainMenuPageComponent
  },
  {
    path: 'employee',
    loadChildren: () => import('../app/employee/employee.module').then(x => x.EmployeeModule)
  }
]