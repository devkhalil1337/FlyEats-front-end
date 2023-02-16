import { Component, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from './product.model';
import { SelectionChoices } from './selections.model';
import { Variants } from './variants.model';
@Injectable({
  providedIn: 'root',
})
export class CartItems {
  cartItemId: number;
  products: Array<Product>;
  totalAmount: number = 0;
  totalAmountInclVatDelivery: number = 0;
  deliveryCharges: number = 0;
  minimumOrder: number = 0;
  vat: number = 0;
  orderType:string = '';
  constructor() { 
  }


  getTotalAmount(){
    return this.totalAmount;
  }

  updateTotalAmount() {
    this.totalAmount = 0;
    this.totalAmountInclVatDelivery = 0;
    console.log("Start Time",this.totalAmount)
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      let productAmount = 0;
      if (product.selectionChoices && product.selectionChoices.length > 0) {
        for (let j = 0; j < product.selectionChoices.length; j++) {
          const choice = product.selectionChoices[j];
          if (choice.checked) {
            this.totalAmount += choice.choicePrice* product.quantity;
            productAmount += choice.choicePrice* product.quantity;;
          }
        }
      }
      if (product.productVariants && product.productVariants.length > 0) {
        for (let k = 0; k < product.productVariants.length; k++) {
          const variant = product.productVariants[k];
          if (variant.checked) {
            this.totalAmount += variant.variationPrice* product.quantity;
            productAmount += variant.variationPrice* product.quantity;;
          }
        }
      }

      if (product.productVariants.length === 0) {
        this.totalAmount += product.productDeliveryPrice * product.quantity;
        productAmount += product.productDeliveryPrice * product.quantity;
      }
      product.productTotalAmount = productAmount;
      
    }
    if(this.orderType == 'Delivery'){
      this.totalAmountInclVatDelivery += this.deliveryCharges;
    }
    this.totalAmountInclVatDelivery += this.totalAmount + this.vat;
      console.log("End Time",this.totalAmount)
  }


}
