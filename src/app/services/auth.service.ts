import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BaseUrl: string = 'https://ecommerce.routemisr.com';
  userData: any = null;
  constructor(private _HttpClient: HttpClient,private _Router:Router) {}
  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signup`, data);
  }
  singIn(data: any): Observable<any> {
    return this._HttpClient.post(`${this.BaseUrl}/api/v1/auth/signin`, data);
  }
  decodeJWT():object {
    let userToken = localStorage.getItem('userToken');
    let decodeToken = jwtDecode(JSON.stringify(userToken));
    this.userData = decodeToken;
    return this.userData;
  }
  logOut(){
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
    this.userData = null;
  }
}
