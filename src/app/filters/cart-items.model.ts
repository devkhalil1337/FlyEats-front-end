import { Component, Injectable, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from './product.model';
import { SelectionChoices } from './selections.model';
import { Variants } from './variants.model';
@Injectable({
  providedIn: 'root',
})
export class CartItems implements OnChanges{
  cartItemId: number;
  products: Array<Product>;
  totalAmount: number = 0;
  deliveryCharges: number = 0;
  minimumOrder: number = 0;
  constructor() {
    this.products = new Array<Product>();
    const sessionCart = JSON.parse(localStorage.getItem("CartInputs") || '{}');
    if(Object.getOwnPropertyNames(sessionCart).length > 0 ){
      this.products = sessionCart.products;
      this.totalAmount = sessionCart.totalAmount;
      this.deliveryCharges = sessionCart.deliveryCharges;
      this.minimumOrder = sessionCart.minimumOrder;
      this.updateTotalAmount();
    }
  }

  getProducts() {
    
  }

  

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.totalAmount,changes)
    // changes.prop contains the old and the new value...
  }

  getTotalAmount(){
    return this.totalAmount;
  }

  updateTotalAmount() {
    this.totalAmount = 0;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      let productAmount = 0;
      if (product.selectionChoices && product.selectionChoices.length > 0) {
        for (let j = 0; j < product.selectionChoices.length; j++) {
          const choice = product.selectionChoices[j];
          if (choice.checked) {
            this.totalAmount += choice.choicePrice;
            productAmount += choice.choicePrice;
          }
        }
      }
      if (product.productVariants && product.productVariants.length > 0) {
        for (let k = 0; k < product.productVariants.length; k++) {
          const variant = product.productVariants[k];
          if (variant.checked) {
            this.totalAmount += variant.variationPrice;
            productAmount += variant.variationPrice;
          }
        }
      }

      if (product.productVariants.length === 0) {
        this.totalAmount += product.productDeliveryPrice * product.quantity;
        productAmount += product.productDeliveryPrice * product.quantity;
      }
      product.productTotalAmount = productAmount;
    }
  }


  private getDeliveryCharges() {
    const business = JSON.parse(
      localStorage.getItem('businessSettings') || '{}'
    );
    this.deliveryCharges = business.deliveryCharges || 0;
  }
}
