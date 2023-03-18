import { Pipe, PipeTransform } from '@angular/core';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { Product } from '@models';

@Pipe({
  name: 'filterMenu'
})
export class FilterMenuPipe implements PipeTransform {

  transform(itemsArr: Product[], categoryId: number, orderType: string) {
    return itemsArr.filter((elm: Product) => {
      // If the product is a delivery product, only show it if the order type is delivery
      if (elm.isDeliveryProduct && orderType === OrderTypes.Delivery) {
        return false;
      }
      
      // If the product is a pickup product, only show it if the order type is pickup
      if (elm.isPickupProduct && orderType === OrderTypes.PickUp) {
        return false;
      }
      
      // If the product is a table product, only show it if the order type is table
      if (elm.isTableProduct && orderType === OrderTypes.Table) {
        return false;
      }
      
      // If the product is not in the specified category, do not show it
      if (elm.categoryId !== categoryId) {
        return false;
      }
      
      // If all checks pass, show the product
      return true;
    });
  }
}
