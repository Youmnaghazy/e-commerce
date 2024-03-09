import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem} from 'src/app/interfaces/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _AuthService: AuthService
    ,private _CartService:CartService
    ) {}
  userData: any = { id: '' };
  userId: any = '';
  cartItems:CartItem[] = [];
  lastOrder:any;
  totalOrderPrice:number = 0;
  isLoading:boolean = false;
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(): void {
    this.userData = this._AuthService.decodeJWT();
    this.userId = this.userData['id'];
    this.getUserOrders(this.userId);
  }
  getUserOrders(id:string): void {
    this.isLoading = true
    this._CartService.getAllOrder(id).subscribe({
      next:res=>{
        this.lastOrder = res[res.length - 1];
        this.totalOrderPrice = this.lastOrder.totalOrderPrice;
        this.cartItems = this.lastOrder.cartItems;
        this.isLoading =false
      },error:err=>{
        console.log(err);
        this.isLoading =false
      }
    })
  }
}
