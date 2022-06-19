import { Component, OnInit } from '@angular/core';
import { orderDeatils } from 'src/app/mock-api/order-details';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  orderDetails:any;

  constructor() { 
    this.orderDetails = orderDeatils
  }

  ngOnInit(): void {
  }

}
