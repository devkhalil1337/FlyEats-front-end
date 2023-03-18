import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Stripe, StripeElements, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { ApiService , AuthService} from '@shared';
import { PaymentChargePayload } from '@models';

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
    let response = await this.apiService.request("get","PaymentGateways/GetPaymentGatewaysKeysByBusinessId").toPromise() 
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
  }

  async submit(amount:number) {
    this.paymentResponse = null;
    this.errorMessage = "";
    this.isLoading = true;
    let payment = new PaymentChargePayload();
    payment.amount = amount;
    try {
      const response = await this.apiService.request("post",'PaymentGateways/CreatePaymentIntent',payment).toPromise();
      const { paymentIntent, error } = await this.stripe.confirmCardPayment(response.client_secret, {
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
      }
    } catch (error:any) {
      this.errorMessage = error && error.error && error.error.message  || "there is something problem";
      this.paymentResponse = null;
      this.isLoading = false;
    }

    return this.paymentResponse;
  }
  


  private async loadStripe(key:string): Promise<Stripe> {
    const stripe = await import('@stripe/stripe-js');
    const stripeInstance = await stripe.loadStripe(key);
    if (stripeInstance === null) {
      throw new Error('Failed to load Stripe');
    }
    return stripeInstance;
  }
}
