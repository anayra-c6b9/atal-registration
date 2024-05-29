import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { minLength } from '../utils/minmaxlengthValidators';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _authService: AuthService, private _navRouter: Router, private toastr: ToastrService, private _cookie: CookieService) {
    this.loginForm = new FormGroup({
      userId: new FormControl(null, [Validators.required, minLength(3)]),
      password: new FormControl(null, [Validators.required, minLength(3)])
    })
  }

  ngOnInit(): void {
    
  }

  onSubmitHandler = (event: any) => {
    event.preventDefault();

    this._authService.adminLoginApi(this.loginForm.value)
    .then((res: any) => {
      if(!res || !res.success){
        switch(res?.status){
          case 400: this.toastr.warning("Missing Fields!");
            break;
          case 404: this.toastr.error("User not found!");
            break;
          case 401: this.toastr.error("Wrong Password!");
            break;
          case 500: this.toastr.error("Internal server error!");
            break;
          default: this.toastr.error("Something went wrong");
        }
      }

      this.toastr.success("Successful Login!");
      this._cookie.set("jwtToken", res.cookie)
      this._navRouter.navigateByUrl("/admin/home");
    })
    .catch(() => {
      this.toastr.error("Something went wrong");
    })
  }
}
