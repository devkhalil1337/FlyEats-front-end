import { Pipe, PipeTransform } from '@angular/core';
import { OrderTypes } from '@enums/OrderTypeEnum';
import { Product } from '@models/product.model';

@Pipe({
  name: 'featureProducts'
})
export class FeatureProductsPipe implements PipeTransform {

  transform(itemsArr: Product[], orderType: string) {
    return itemsArr.filter((elm: Product) => {
      // If the product is not in the specified category, do not show it
      if (!elm.featured) {
        return false;
      }
    // If the product is a delivery product, only show it if the order type is delivery
    if(orderType === OrderTypes.Delivery){
      return elm.isDeliveryProduct
    }
    
    // If the product is a pickup product, only show it if the order type is pickup
    if(orderType === OrderTypes.PickUp){
      return elm.isPickupProduct
    }
    
    // If the product is a table product, only show it if the order type is table
    if(orderType === OrderTypes.Table){
      return elm.isTableProduct;
    }
    
  
    
    // If all checks pass, show the product
    return true;
  });
  }

}
