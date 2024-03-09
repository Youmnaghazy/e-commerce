import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ) {}
  productId: string = '';
  productItem:Product = {} as Product;
  isLoading:boolean = false;
  isSubmitting:boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this._ProductsService.getProductByID(this.productId).subscribe({
      next: (res) => {
        this.productItem = res.data;
        this.isLoading = false;
      },error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }
  addProductToCart(id:string){
    this.isSubmitting = true
    this._CartService.addProduct(id).subscribe({
      next:res=>{
        console.log(res);
        this._ToastrService.success(res.message);
        this.isSubmitting = false;
        this._CartService.numOfCartItems.next(res.numOfCartItems);
      },error:err=>{
        console.log(err);
        this.isSubmitting = false;
      }
    })
  }
}
