import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgotPassService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';
  constructor(private _HttpClient: HttpClient) {}
  forgotPass(forgetForm: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}forgotPasswords`, forgetForm);
  }
  verifyNewPass(verifyForm: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}verifyResetCode`, verifyForm);
  }
  updatePass(updatePassForm: object): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}resetPassword`,
      updatePassForm
    );
  }
}
