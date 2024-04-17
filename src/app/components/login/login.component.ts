import { Component } from '@angular/core';
import { FormControl, FormGroup, PatternValidator, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginform: FormGroup;
  constructor(private _loginService:LoginService, private _router:Router) {
    this.loginform = new FormGroup(
      {
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
      }
    )
  }
  submit() {
    this._loginService.login(this.loginform.value).subscribe(
      (data:any)=>{
        localStorage.setItem("token",data.token);
        this._router.navigateByUrl("/dashboard");
        alert("Login successfully");
      },
      (err:any)=>{
        alert("Invalid credential");
      }
    )
    // console.log(this.loginform.value);

  }

}
