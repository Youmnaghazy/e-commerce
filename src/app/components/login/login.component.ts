import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService,private _Router:Router) {}
  isLoading: boolean = false;
  apiError:string = '';
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  submitLoginForm(data: FormGroup) {
    this.isLoading = true;
    if (data.valid) {
      this._AuthService.singIn(data.value).subscribe({
        next: (res) => {
          if(res.message === 'success'){
            localStorage.setItem('userToken',res.token);
            this._AuthService.decodeJWT();
            this._Router.navigate(['/home'])
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error.message
        },
      });
    }
  }
}
