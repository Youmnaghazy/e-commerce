import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[],title:string): Product[] {
    return products.filter((item)=>{
      return item.title.toLowerCase().includes(title.toLowerCase())
    });
  }

}
