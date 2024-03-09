import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductList } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  isLoading:boolean = false;
  inSufficientAdd:boolean = false;
  inSufficientDelete:boolean = false;
  numOfCartItems: number = 0;
  productList: ProductList[] = [];
  cartId:string = ''
  totalCartPrice: number = 0;
  errorMessage:string = ''
  constructor(private _CartService: CartService,private _ToastrService:ToastrService) {}
  ngOnInit(): void {
    this.getUserCart();
  }
  getUserCart() {
    this.isLoading = true;
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.numOfCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice;
        this.productList = res.data.products;
        this.cartId = res.data._id;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = (err.error.message).split(" ").splice(0,6).join(" ");
      },
    });
  }
  clearUserCart() {
    this.isLoading = true;
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        this.numOfCartItems = 0;
        this.totalCartPrice = 0;
        this.productList = [];
        this.isLoading = false;
        this.errorMessage = "No Cart For This User";
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  removeItem(id:string){
    this.isLoading = true;
    this._CartService.removeSpecificItem(id).subscribe({
      next:res=>{
        this.numOfCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice;
        this.productList = res.data.products;
        this._ToastrService.error("Item Removed");
        this.isLoading = false;
        if(this.numOfCartItems === 0){
          this.errorMessage = 'No Cart For This User'
        }
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },error:err=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
  updateItemCount(id:string,count:number){
    this.isLoading = true;
    this._CartService.updateItemCount(id,count).subscribe({
      next:res=>{
        this.numOfCartItems = res.numOfCartItems;
        this.totalCartPrice = res.data.totalCartPrice;
        this.productList = res.data.products;
        this.isLoading = false;
      },error:err=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }
  isAddButtonDisabled(productItem: ProductList): boolean {
    return productItem.count >= 5;
  }
  isDeleteButtonDisabled(productItem: ProductList): boolean {
    return productItem.count <= 0;
  }
}
