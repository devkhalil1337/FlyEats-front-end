import { Injectable } from '@angular/core';
import { Product } from '../filters/cart-product.filter';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }



  onQuantityIncrease(product:Product){
    return product.quantity > 0 ? product.quantity++ : 1;
  }

  onQuantityDecrease(product:Product){
    return product.quantity > 1 ? product.quantity-- : 1;
  }


  onCartUpdate(CartArr:any[] = [],product:any){
    if(!CartArr || CartArr.length == 0){
      product.cartId = 1;
      CartArr.push(product);
    }

    CartArr.forEach((elm,index) =>{
      if(elm.cartId == product.cartId){
        elm.quantity = product.quantity;
      }
    })



    return CartArr;
  }


}
