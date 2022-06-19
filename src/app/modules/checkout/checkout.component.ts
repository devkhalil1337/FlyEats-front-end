import { Component, OnInit } from '@angular/core';
import { orderDeatils } from 'src/app/mock-api/order-details';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderDetails:any;
  constructor() { 
    this.orderDetails = orderDeatils
  }

  ngOnInit(): void {
  }

}
