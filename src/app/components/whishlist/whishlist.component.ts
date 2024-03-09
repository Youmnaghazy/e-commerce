import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/interfaces/products';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  constructor(
    private _WhishlistService: WhishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  productList: Product[] = [];
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  wishlistData: string[] = [];
  emptyMessage: string = '';
  ngOnInit(): void {
    this.loadWishList();
  }
  loadWishList(): void {
    this._WhishlistService.getWhishList().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.wishlistData = this.productList.map((item) => item._id);
        this.updateEmptyMessage();
      },
    });
  }
  updateEmptyMessage(): void {
    if (this.productList.length == 0) {
      this.emptyMessage = 'No Wishlist';
    } else {
      this.emptyMessage = '';
    }
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
  removeFromFav(prodId: any): void {
    this._WhishlistService.removeFromWhishList(prodId).subscribe({
      next: (res) => {
        this._ToastrService.error(res.message);
        this.wishlistData = res.data;
        const newProductList = this.productList.filter((item) =>
          this.wishlistData.includes(item._id)
        );
        this.productList = newProductList;
        this.updateEmptyMessage()
        this._WhishlistService.whishlistnumber.next(res.data.length);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
