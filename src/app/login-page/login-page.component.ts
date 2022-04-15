import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as dataEmployee from '../../assets/dummydata.json';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public data = dataEmployee;

  public loginForm: FormGroup;
  public empty = true;
  public isInvalid = false;

  public formSubmitted = false;

  public errorText = '';

  constructor(
    private router: Router,) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.loginForm.valueChanges.subscribe(res => {
      this.empty = !!res.username && !!res.password ? false : true;
    });
  }

  ngOnInit() { }

  doLogin() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.isInvalid = true

      if (this.loginForm.controls['password']['status'] === 'INVALID') {
        this.errorText = 'Password Minimal 6 Karakter';
      }
    } else {
      sessionStorage.setItem('data', JSON.stringify(this.data['employee']));
      sessionStorage.setItem('canLogin', JSON.stringify(true));
      this.router.navigateByUrl('home');
    }
  }

}
