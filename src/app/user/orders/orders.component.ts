import { Component, OnInit } from '@angular/core';
import { orders } from 'src/app/mock-api/orders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersList:any[]

  constructor(private ordersService:OrdersService) {
    this.ordersList = orders;
    this.onFetchAllOrdersList();
   }

  ngOnInit(): void {
  }

  onFetchAllOrdersList(){
    this.ordersService.getOrdersList().subscribe(response => {
      this.ordersList = response;
    })
  }
}
