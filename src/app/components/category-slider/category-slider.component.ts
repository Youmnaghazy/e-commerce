import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryItem } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css']
})
export class CategorySliderComponent implements OnInit{
 constructor(private _ProductsService:ProductsService){}
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
   categoryList:CategoryItem[] = [];
  ngOnInit(): void {
      this._ProductsService.getAllCategories().subscribe({
        next:(res)=>{
          this.categoryList = res.data;
        },error:(err)=>{
          console.log(err);
        }
      })

  }
}
