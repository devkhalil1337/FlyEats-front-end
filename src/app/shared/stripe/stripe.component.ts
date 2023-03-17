import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { ApiService } from '@shared/api.service';
import { AuthService } from 'src/app/user/auth/auth.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html'
})
export class StripeComponent implements AfterViewInit {
  stripe: Stripe;
  elements: StripeElements;
  cardElement: StripeCardElement;
  errorMessage: string;
  paymentResponse:any;
  isLoading:boolean;
  stripePublicKey:string = "";
  @ViewChild('cardElement', { static: true }) cardElementRef: ElementRef;

  
  constructor(private apiService:ApiService,private authService:AuthService){  
    this.subscribeStripeConfig()
  }


  subscribeStripeConfig(){
    
  }

  async ngAfterViewInit() {
    this.apiService.request("get","PaymentGateways/GetPaymentGatewaysKeysByBusinessId").subscribe(async response => {
      let stripe = response.find((payment:any) => payment.gatewayName == 'stripe');
      if(stripe){
        this.stripe = await this.loadStripe(stripe.apiKey);
        this.elements = this.stripe.elements();
        const cardElementOptions: StripeCardElementOptions = {
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
            },
          },
        };
        this.cardElement = this.elements.create('card', cardElementOptions);
        this.cardElement.mount(this.cardElementRef.nativeElement);
        this.isLoading = false;
      }
    },error => {

      console.log(error);
    });
  }

  async submit(amount:number) {
    this.paymentResponse = null;
    this.isLoading = true;
  
    try {

      // this.apiService.request("post",'Order/CreatePaymentIntent',{amount:amount}).subscribe(response => {

      // })
      const response = await fetch(`${this.apiService.path}Order/CreatePaymentIntent?amount=` + amount, {
        method: 'POST'
      });
  
      const data = await response.json();
  
      const { paymentIntent, error } = await this.stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: this.authService.userDisplayname,
            email:this.authService.userEmail
          }
        }
      });
  
      this.isLoading = false;
  
      if (error) {
        console.error(error.message);
        this.errorMessage = error.message || "";
        this.paymentResponse = null;
      } else {
        this.paymentResponse = paymentIntent;
        console.log(paymentIntent);
      }
    } catch (error:any) {
      this.errorMessage = error && error.message || "";
      this.paymentResponse = error;
      this.isLoading = false;
    }

    return this.paymentResponse;
  }
  


  private async loadStripe(key:string): Promise<Stripe> {
    console.log("Im in")
    const stripe = await import('@stripe/stripe-js');
    const stripeInstance = await stripe.loadStripe(key);
    if (stripeInstance === null) {
      throw new Error('Failed to load Stripe');
    }
    return stripeInstance;
  }
}
