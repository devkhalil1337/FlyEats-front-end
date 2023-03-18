import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { PaymentMethods } from 'src/app/enums/PaymentMethodsEnum';
import { CartItems } from 'src/app/filters/cart-items.model';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { Address } from 'src/app/models/address';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { CartService } from '@shared/cart.service';
import { LocalStorageService } from '@shared/local-storage.service';
import { StripeComponent } from 'src/app/shared/stripe/stripe.component';
import { AddressesService } from '../addresses/addresses.service';
import { AuthService } from '../auth/auth.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,AfterViewInit {
  orderDetails: any;
  CartInputs: CartItems;
  addressList: Address[]
  selectedAddress: number = 0;
  isLoading:boolean = false;
  selectedMethod: string = PaymentMethods.COD;
  OrderTypes:any;
  fieldVisible = false;
  voucherCode: string;
  @ViewChild('stripeComponent') stripeComponent: StripeComponent;
  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private addressesService: AddressesService,
    private authService: AuthService,
    private localStorageService: LocalStorageService) {
    this.CartInputs = new CartItems();
    this.addressList = new Array<Address>()
    this.OrderTypes = OrderTypes;
  }

  ngOnInit(): void {
 
  }

  ngAfterViewInit(){
    this.subscribeAddress();
  }

  onAddressSelection(index: number) {
    this.selectedAddress = index;
  }

  subscribeAddress(){
    console.log(this.CartInputs)
    if(this.CartInputs.orderType == OrderTypes.Delivery){
      this.addressesService.getActiveAddressesByUserId(this.authService.userId).subscribe((response:Address[]) => {
        this.addressList = response;
        if(response && response.length > 0){ 
          this.selectedAddress = response[0].addressId //select first address by default
        }
      });
    }
  }


  async onCheckoutClick() {
    this.isLoading = true;
    let paymentResponse = {};
    if(this.selectedMethod == PaymentMethods.CARD){
      paymentResponse = await this.stripeComponent.submit(this.CartInputs.totalAmountInclVatDelivery);
      if(paymentResponse == null){
        this.isLoading = false;
        return;
      }
    }
    const orderId = this.cartService.createUniqueString()
    const order = this.cartService.CreateOrder(orderId, this.selectedAddress,this.selectedMethod,paymentResponse);
    const orderDetails = this.cartService.CreateOrderDetails(orderId);
    forkJoin(
      this.checkoutService.onSendOrder(order),
      this.checkoutService.onSendOrderDetails(orderDetails)
    ).subscribe(([orderResponse, OrderDetailsResponse]) => {
      this.isLoading = false;
      localStorage.removeItem("CartInputs");
      this.CartInputs = new CartItems();
      this.cartService.setCartItems(this.CartInputs);
      this.authService.onMyOrders();
    },(error) => {
      this.isLoading = false;
      console.log(error);
    });
  }

  showField() {
    this.fieldVisible = !this.fieldVisible;
  }

  onApplyVoucher() {
    this.checkoutService.onVoucherApply(this.voucherCode, this.authService.userId, this.CartInputs.totalAmount).subscribe((response:any) => {
      console.log({ response });
    }, (error:any) => {
      console.log({ error });
    });
  }

  get BusinessDetails() {
    return this.localStorageService.getBusinessDetails();
  }

  onloadPage($event?: any) {
    this.CartInputs = $event;
    this.cartService.setCartItems($event);
  }

}
