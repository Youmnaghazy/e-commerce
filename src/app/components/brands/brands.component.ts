import { Brands } from 'src/app/interfaces/brands';
import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  constructor(private _BrandsService:BrandsService){}
  brandsData:Brands[] = []
  p: number = 1;
  isLoading: boolean = false;
  ngOnInit(): void {
      this.getBrands()
  }
  getBrands():void{
    this.isLoading = true
    this._BrandsService.getAllBrands().subscribe({
      next:res=>{
        this.brandsData = res.data
        this.isLoading = false
      },error:err=>{
        console.log(err);
        this.isLoading = false
      }
    })
  }
}
