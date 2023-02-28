import { Component, Input, OnInit, OnChanges,SimpleChanges, Output, EventEmitter } from '@angular/core';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { CartService } from '@shared/cart.service';
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
  @Input("totalAmountInclVatDelivery") totalAmountInclVatDelivery: number = 0;
  @Input("deliveryCharges") deliveryCharges: number = 0;
  @Input("minimumOrder") minimumOrder: number = 0;
  @Input("vat") vat: number = 0;
  @Input("orderType") orderType:string = OrderTypes.Delivery;
  @Input("tableNumber") tableNumber:string = '0';
  @Output("CartItemsEmit") CartItemsEmit = new EventEmitter();

  constructor(private cartService:CartService) {
    this.products = new Array<Product>();
    const sessionCart = JSON.parse(localStorage.getItem("CartInputs") || '{}');
    if(Object.getOwnPropertyNames(sessionCart).length > 0 ){
      this.products = sessionCart.products;
      this.totalAmount = sessionCart.totalAmount;
      this.deliveryCharges = sessionCart.deliveryCharges;
      this.minimumOrder = sessionCart.minimumOrder;
      this.vat = sessionCart.vat;
      this.orderType =  sessionCart.orderType || 'Delivery'
      this.tableNumber =  sessionCart.tableNumber;
    }
    this.CartItems = new CartItems();
   }

  ngOnInit(): void {
    this.getDeliveryCharges();
    this.CartItems.products = this.products;
    this.CartItems.totalAmount = this.totalAmount;
    this.CartItems.deliveryCharges = this.deliveryCharges;
    this.CartItems.minimumOrder = this.minimumOrder;
    this.CartItems.vat = this.vat;
    this.CartItems.orderType = this.orderType;
    this.CartItems.tableNumber = this.tableNumber;
    this.CartItems.updateTotalAmount();
    this.CartItemsEmit.emit(this.CartItems);
    }


    
  private getDeliveryCharges() {
    const business = JSON.parse(
      localStorage.getItem('businessSettings') || '{}'
    );
    this.deliveryCharges = business.deliveryCharges || 0;
    this.minimumOrder = business.minimumOrder || 0;
    this.vat = business.vat || 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log({changes})
  }

}
