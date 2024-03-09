import { Component, OnInit } from '@angular/core';
import {CategoryItem } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: CategoryItem[] = [];
  constructor(private _ProductsService: ProductsService) {}
  ngOnInit(): void {
    this._ProductsService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
