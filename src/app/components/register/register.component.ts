import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLoggedIn: boolean = false;
  apiError: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^\w{6,}$/),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125]\d{8}$/),
    ]),
  },{validators:this.checkPasswordMatch});
  submitRegisterForm(data: FormGroup) {
    this.isLoggedIn = true;
    if (data.valid) {
      this._AuthService.signUp(data.value).subscribe({
        next: (res) => {
          if (res.message) {
            this.isLoggedIn = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.apiError = err.error.message;
          this.isLoggedIn = false;
        },
      });
    }
  }
  checkPasswordMatch(formData: any) {
    if (formData.get('password')?.value === formData.get('rePassword')?.value) {
      return null;
    } else {
      formData
        .get('rePassword')
        ?.setErrors({ rePasswordMatch: "password doesn't mathc rePassword" });
      return { rePasswordMatch: "password doesn't mathc rePassword" };
    }
  }
}
