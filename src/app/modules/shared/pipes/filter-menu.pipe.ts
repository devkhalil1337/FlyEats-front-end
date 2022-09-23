import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/filters/product.model';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  transform(itemsArr: Product[], categoryId: number) {
    let results = itemsArr?.filter((elm:Product) => elm.categoryId == categoryId);
    return results ? results : null;
  }

}
