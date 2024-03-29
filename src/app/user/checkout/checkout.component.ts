import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { PaymentMethods } from 'src/app/enums/PaymentMethodsEnum';
import { Address,CartItems } from '@models';
import { CartService,LocalStorageService,AuthService, BusinessTimeService } from '@shared';
import { StripeComponent } from 'src/app/shared/stripe/stripe.component';
import { AddressesService } from '../addresses/addresses.service';
import { CheckoutService } from './checkout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit,AfterViewInit {
  @ViewChild('stripeComponent') stripeComponent: StripeComponent;
 
  orderDetails: any;
  CartInputs: CartItems;
  addressList: Address[]
  selectedAddress: number = 0;
  isLoading:boolean = false;
  selectedMethod: string = PaymentMethods.COD;
  OrderTypes:any;
  fieldVisible = false;
  voucherCode: string;
  checkoutForm: FormGroup;
  isBusinessOn:boolean = false;

  get checkoutPageValidation(){
    if(this.CartInputs?.products?.length === 0)
      return true;

    return false;
  }
  
  constructor(private cartService: CartService, private checkoutService: CheckoutService,
    private addressesService: AddressesService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private businessTimeService:BusinessTimeService) {
    this.CartInputs = new CartItems();
    this.addressList = new Array<Address>()
    this.OrderTypes = OrderTypes;
  }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      isAddressSelected: ['', Validators.required]
    });
  }

  ngAfterViewInit(){
    this.subscribeAddress();
  }

  onAddressSelection(index: number) {
    this.selectedAddress = index;
    this.checkoutForm.controls['isAddressSelected'].setValue(true); 
  }

  subscribeAddress(){
    if(this.CartInputs.orderType == OrderTypes.Delivery){
      this.addressesService.getActiveAddressesByUserId(this.authService.userId).subscribe((response:Address[]) => {
        this.addressList = response;
        if(response && response.length > 0){ 
          this.selectedAddress = response[0].addressId //select first address by default
          this.checkoutForm.controls['isAddressSelected'].setValue(true);         
        }else{
          this.checkoutForm.controls['isAddressSelected'].setValue(null);
        }
      });
    }
  }


  async onCheckoutClick() {
    
    if(this.checkoutPageValidation)
      return;
    await this.checkIsBusinesson()
    if(!this.isBusinessOn){
      alert("Restaurant is closed")
      return;
    }

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


  onModelChange(){}

  onloadPage($event?: any) {
    this.CartInputs = $event;
    this.cartService.setCartItems($event);
    if(this.CartInputs.orderType !== OrderTypes.Delivery){
      this.checkoutForm.controls['isAddressSelected'].setValidators(null);
    }
  }

  async checkIsBusinesson():Promise<void> {
    try {
      await this.businessTimeService.checkIsOpen();
      const res = await this.businessTimeService.getIsOpen().pipe(first()).toPromise();
      this.isBusinessOn = res;
    } catch (error) {
      this.isBusinessOn = false;
      console.log(error);
    }
  }

}
