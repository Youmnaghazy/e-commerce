import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPassService } from 'src/app/services/forgot-pass.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent {
  isLoading: boolean = false;
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  useEmail: any = '';
  errMessage: string = '';
  userMessage: string = '';
  forgetForm = new FormGroup({
    email: new FormControl(''),
  });
  resetCodeForm = new FormGroup({
    resetCode: new FormControl(''),
  });
  resetPassForm = new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl(''),
  });
  constructor(
    private _ForgotPassService: ForgotPassService,
    private _Router: Router
  ) {}
  forgetPass(): void {
    let useEmailForm = this.forgetForm.value;
    this.useEmail = useEmailForm.email;
    this.isLoading = true;
    this._ForgotPassService.forgotPass(useEmailForm).subscribe({
      next: (res) => {
        this.userMessage = res.message;
        this.isLoading = false;
        this.step1 = false;
        this.step2 = true;
        this.errMessage = '';
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
  resetCode(): void {
    let codeForm = this.resetCodeForm.value;
    this.isLoading = true;
    this._ForgotPassService.verifyNewPass(codeForm).subscribe({
      next: (res) => {
        this.step2 = false;
        this.step3 = true;
        this.userMessage = res.status;
        this.isLoading = false;
        this.errMessage = '';
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
  resetPass(): void {
    let resetPass = this.resetPassForm.value;
    resetPass.email = this.useEmail;
    this.isLoading = true;
    this.errMessage = '';
    this._ForgotPassService.updatePass(resetPass).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this._Router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
