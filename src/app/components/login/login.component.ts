import { Component } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginform: FormGroup;
  constructor() {
    this.loginform = new FormGroup(
      {
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      }
    )
  }
  login() {
    console.log(this.loginform.value);

  }

}
