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
  @ViewChild('cardElement', { static: true }) cardElementRef: ElementRef;

  constructor(private apiService:ApiService,private authService:AuthService){}

  async ngAfterViewInit() {
    this.stripe = await this.loadStripe();
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

  async submit(amount:number) {
    this.paymentResponse = null;
    this.isLoading = true;
  
    try {
      const response = await fetch('http://localhost:5112/api/Order/CreatePaymentIntent?amount=' + amount, {
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
  


  private async loadStripe(): Promise<Stripe> {
    const stripe = await import('@stripe/stripe-js');
    const stripeInstance = await stripe.loadStripe('pk_test_F3SD4Wgse2bzS0OaJlMNbLoz');
    if (stripeInstance === null) {
      throw new Error('Failed to load Stripe');
    }
    return stripeInstance;
  }
}
