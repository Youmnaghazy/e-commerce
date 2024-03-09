import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/services/whishlist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WhishlistService: WhishlistService
  ) {}
  productList: Product[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  wishlistData:string[] = [];
  p: number = 1;
  searchWord: string = '';
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading = true;
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  addProductToCart(id: string) {
    this.isSubmitting = true;
    this._CartService.addProduct(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.isSubmitting = false;
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this.isSubmitting = false;
      },
    });
  }
  addToFav(prodId: any): void {
    this._WhishlistService.addToWhishList(prodId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message)
        this.wishlistData = res.data;
        this._WhishlistService.whishlistnumber.next(res.data.length);
      },error:err=>{
        console.log(err);
      }
    });
  }
  removeFromFav(prodId: any): void {
    this._WhishlistService.removeFromWhishList(prodId).subscribe({
      next: (res) => {
        this._ToastrService.error(res.message)
        this.wishlistData = res.data;
        this._WhishlistService.whishlistnumber.next(res.data.length);
      },error:err=>{
        console.log(err);
      }
    });
  }
}
