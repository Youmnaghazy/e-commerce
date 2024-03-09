import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient:HttpClient) { }
  BaseUrl: string = 'https://ecommerce.routemisr.com';
  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products`);
  }
  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/categories`);
  }
  getProductByID(id:string):Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}/api/v1/products/${id}`);
  }
}
