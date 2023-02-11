import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartItems } from 'src/app/filters/cart-items.model';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { CartService } from 'src/app/modules/shared/cart.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderDetails:any;
  CartInputs: CartItems;
  constructor(private cartService:CartService, private checkoutService:CheckoutService) { 
    this.CartInputs = new CartItems();
    this.CartInputs.getProducts();
    console.log(this.CartInputs);
    this.orderDetails = orderDeatils
  }

  ngOnInit(): void {
  }


  onCheckoutClick(){
    const orderId = this.cartService.createUniqueString()
    const order = this.cartService.CreateOrder(orderId);
    const orderDetails = this.cartService.CreateOrderDetails(orderId);
    forkJoin(
      this.checkoutService.onSendOrder(order),
      this.checkoutService.onSendOrderDetails(orderDetails)
    ).subscribe(([orderResponse, OrderDetailsResponse]) => {
     console.log({orderResponse},{OrderDetailsResponse});
     localStorage.removeItem("CartInputs");
    });
  }

}
