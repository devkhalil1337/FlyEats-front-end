import { Injectable } from '@angular/core';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Product } from 'src/app/filters/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItems;

  get CartItemsLastId(){
    return this.cartItems.products.length+1;
  }



  constructor() { 
    this.cartItems = new CartItems();

  }

  ngOnChanges(){
    console.log("Checked",this.cartItems)
  }



  onQuantityIncrease(product:any){
    return product.quantity > 0 ? product.quantity++ : 1;
  }

  onQuantityDecrease(product:any){
    return product.quantity > 1 ? product.quantity-- : 1;
  }

  onRemoveProduct(productId:number){
    return this.cartItems.products = this.cartItems.products.filter(elm => elm.productId != productId);
  }


  onCartUpdate(product: Product,selectionProduct?:any) {
    if(selectionProduct.length > 0)
      product.selectionChoices = this.extractCheckedModiferProducts(selectionProduct);


    if(!this.cartItems || this.cartItems.products.length == 0) {
      // product.cartId = this.CartItemsLastId;
      this.cartItems.products.push(product);
    } else {
      let isNewProduct = false;
      let index = this.cartItems.products.findIndex(elm => elm.productId == product.productId);
      if(index != -1) {
        this.cartItems.products[index].quantity = product.quantity;
        isNewProduct = false;
      } else {
        isNewProduct = true;
      }
      if(isNewProduct) {
        // product.cartId = this.CartItemsLastId;
        this.cartItems.products.push(product);
      }
    }
    localStorage.setItem("CartInputs",JSON.stringify(this.cartItems))
    return this.cartItems.products;
  }


  isProductExists(product:Product){
    return this.cartItems.products.every(elm =>  {
      if(elm && elm.selectionChoices && elm.selectionChoices.length > 0){
        
      }
    });
  }
  
  extractCheckedModiferProducts(selectionProduct:any){
    let selections: any[] = [];
    selectionProduct.forEach((element:any,index:number) => {
      selections[index] = element.selectionChoices.filter((elm:any) => elm.checked);
    })
    return selections[0];
  }


}
