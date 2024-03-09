import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  numOfCartItems:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient: HttpClient) {}
  addProduct(poductId: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/cart`,
      { productId: poductId }
    );
  }
  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`,);
  }
  removeSpecificItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`);
  }
  updateItemCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/cart/${id}`,
      { count: count }
    );
  }
  checkOut(cartId:any,cartInfo:object):Observable<any>{
    let encodedURL = `https://fresh-cart-mu.vercel.app/` + encodeURIComponent('#');
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${encodedURL}`,
    {shippingAddress:cartInfo}
    )
  }
  getAllOrder(id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/orders/user/${id}`)
  }
  getAllSubCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}/subcategories`)
  }
  getAllSpecificCategory(id:string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories/${id}`)
  }
}
