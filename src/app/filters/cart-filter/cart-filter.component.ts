import { Component, Input, OnInit, OnChanges,SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/modules/shared/cart.service';
import { CartItems } from '../cart-items.model';

import { Product } from '../product.model';

@Component({
  selector: 'app-cart-filter',
  templateUrl: './cart-filter.component.html'
})
export class CartFilterComponent implements OnChanges {

  @Input("CartItems") CartItems: CartItems;
  @Input("products") products: Array<Product>;
  @Input("totalAmount") totalAmount: number = 0;
  @Input("deliveryCharges") deliveryCharges: number = 0;
  @Input("minimumOrder") minimumOrder: number = 0;
  @Input("orderType") orderType:string;
  @Output("CartItemsEmit") CartItemsEmit = new EventEmitter();

  constructor(private cartService:CartService) {
    this.products = new Array<Product>();
    this.orderType = 'Delivery';
    const sessionCart = JSON.parse(localStorage.getItem("CartInputs") || '{}');
    if(Object.getOwnPropertyNames(sessionCart).length > 0 ){
      this.products = sessionCart.products;
      this.totalAmount = sessionCart.totalAmount;
      this.deliveryCharges = sessionCart.deliveryCharges;
      this.minimumOrder = sessionCart.minimumOrder;
      this.orderType =  sessionCart.orderType || 'Delivery'
    }
   }

  ngOnInit(): void {
    this.CartItems = new CartItems();
    this.CartItems.products = this.products;
    this.CartItems.totalAmount = this.totalAmount;
    this.CartItems.deliveryCharges = this.deliveryCharges;
    this.CartItems.minimumOrder = this.minimumOrder;
    this.CartItems.orderType = this.orderType;
    this.CartItemsEmit.emit(this.CartItems);
    this.CartItems.updateTotalAmount();
    }

  ngOnChanges(changes: SimpleChanges) {}

}
