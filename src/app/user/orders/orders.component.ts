import { Component, OnInit } from '@angular/core';
import { orders } from 'src/app/mock-api/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersList:any[]

  constructor() {
    this.ordersList = orders;
   }

  ngOnInit(): void {
  }
}
