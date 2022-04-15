import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

declare var bootstrap: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public faRightFromBracket = faRightFromBracket;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    // for tooltip
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  }

  moveTo(params: string) {
    if (params === 'home') {
      this.router.navigateByUrl('');
    } else if (params === 'login') {
      sessionStorage.clear();
      this.router.navigateByUrl('login');
    }
  }

}
