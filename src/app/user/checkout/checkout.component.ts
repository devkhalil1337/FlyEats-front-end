import { Component, OnInit } from '@angular/core';
import { CartItems } from 'src/app/filters/cart-items.model';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { CartService } from 'src/app/modules/shared/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderDetails:any;
  CartInputs: CartItems;
  constructor(private cartService:CartService) { 
    this.CartInputs = new CartItems();
    this.CartInputs = this.CartInputs.getProducts();
    console.log(this.CartInputs);
    this.orderDetails = orderDeatils
  }

  ngOnInit(): void {
  }

}
