import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartItems } from 'src/app/filters/cart-items.model';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { Address } from 'src/app/models/address';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { CartService } from 'src/app/modules/shared/cart.service';
import { AddressesService } from '../addresses/addresses.service';
import { AuthService } from '../auth/auth.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderDetails:any;
  CartInputs: CartItems;
  addressList:Address[]
  selectedAddress:number;
  constructor(private cartService:CartService, private checkoutService:CheckoutService,
    private addressesService:AddressesService,
    private authService:AuthService) { 
    this.CartInputs = new CartItems();
    this.addressList = new Array<Address>()
  }

  ngOnInit(): void {
    this.addressesService.getActiveAddressesByUserId(this.authService.userId).subscribe(response => {
      this.addressList = response;
    })
  }

  onAddressSelection(index: number) {
    this.selectedAddress = index;
  }


  onCheckoutClick(){
    const orderId = this.cartService.createUniqueString()
    const order = this.cartService.CreateOrder(orderId,this.selectedAddress);
    const orderDetails = this.cartService.CreateOrderDetails(orderId);
    forkJoin(
      this.checkoutService.onSendOrder(order),
      this.checkoutService.onSendOrderDetails(orderDetails)
    ).subscribe(([orderResponse, OrderDetailsResponse]) => {
     localStorage.removeItem("CartInputs");
     this.CartInputs = new CartItems();
     this.cartService.setCartItems(this.CartInputs);
     this.authService.onMyOrders();
    });
  }

  onloadPage($event?:any){
    this.CartInputs = $event;
    console.log({$event})
    this.cartService.setCartItems($event);
  }

}
