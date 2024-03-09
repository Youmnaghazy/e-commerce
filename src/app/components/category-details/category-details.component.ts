import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import {CategoryItem } from 'src/app/interfaces/products';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  categoryId: any = '';
  category: CategoryItem = {} as CategoryItem;
  subCategoryList: CategoryItem[] = [];
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCategoryId();
    this.getCategory(this.categoryId);
    this.getSubCategories(this.categoryId)
  }
  getCategoryId() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
  }
  getCategory(id: string) {
    this._CartService.getAllSpecificCategory(id).subscribe({
      next: (res) => {
        this.category = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSubCategories(id: string) {
    this._CartService.getAllSubCategory(id).subscribe({
      next: (res) => {
        console.log("res",res.data);

        this.subCategoryList = res.data;
        console.log('cattsub', this.subCategoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
