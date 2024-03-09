import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhishlistService {
  whishlistnumber = new BehaviorSubject<number>(0);
  constructor(private _HttpClient: HttpClient) {}
  baseUrl = `https://ecommerce.routemisr.com/api/v1/`;

  addToWhishList(prodId: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}wishlist`, {
      productId: prodId,
    });
  }
  removeFromWhishList(prodId: any): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}wishlist/${prodId}`);
  }
  getWhishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}wishlist`);
  }
}
