import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }



  onQuantityIncrease(product:any){
    return product.quantity > 0 ? product.quantity++ : 1;
  }

  onQuantityDecrease(product:any){
    return product.quantity > 1 ? product.quantity-- : 1;
  }

  onRemoveProduct(CartArr:any[] = [],cartId:number){
    return CartArr = CartArr.filter(elm => elm.cartId != cartId);
  }


  onCartUpdate(CartArr:any[] = [],product:any){
    if(!CartArr || CartArr.length == 0){
      product.cartId = 1;
      CartArr.push(product);
    }else{
      let isNewProduct = false;
      let index = CartArr.findIndex(elm => elm.cartId == product.cartId);
      if(index != -1){
        CartArr[index].quantity = product.quantity;
        isNewProduct = false;
      }else{
        isNewProduct = true;
      }
      if(isNewProduct){
        product.cartId = CartArr.length+1;
        CartArr.push(product);
      }
      }
    return CartArr;
  }


}
