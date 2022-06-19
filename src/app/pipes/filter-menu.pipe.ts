import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  transform(itemsArr: any, categoryId: number) {
    let results = itemsArr.filter((elm:any) => elm.cateId == categoryId);
    return results ? results : null;
  }

}
