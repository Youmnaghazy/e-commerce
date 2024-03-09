import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent implements OnInit {
  whishlistNum: number = 0;
  cartListNum: number = 0;
  constructor(
    public _AuthService: AuthService,
    public _CartService: CartService,
    public _WhishlistService: WhishlistService
  ) {}
  ngOnInit() {
    this.navAnimation();
    this.updateWhishListNum();
    this.getWishList();
    this.updatCartListNum();
    this.getCart();
  }
  navAnimation() {
    $(() => {
      $(window).on('scroll', function () {
        if ($(window).scrollTop()) {
          $('.navbar').removeClass('py-4');
          $('.navbar').addClass('py-2');
        } else {
          $('.navbar').removeClass('py-2');
          $('.navbar').addClass('py-4');
        }
      });
    });
  }
  updateWhishListNum(): void {
    this._WhishlistService.whishlistnumber.subscribe({
      next: (res) => {
        this.whishlistNum = res;
      },
    });
  }
  getWishList() {
    this._WhishlistService.getWhishList().subscribe({
      next: (res) => {
        this.whishlistNum = res.count;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updatCartListNum(): void {
    this._CartService.numOfCartItems.subscribe({
      next: (res) => {
        this.cartListNum = res;
      },
    });
  }
  getCart(): void {
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartListNum = res.numOfCartItems;
      },
    });
  }
}
