import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { OrderDetailsService } from './order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  order:any;
  orderDetails:any;

  constructor(
    private orderDetailsService:OrderDetailsService,
    private activatedRoute: ActivatedRoute
    ) { 
      this.getOrderDetails();
  }

  ngOnInit(): void {
  }


  getOrderDetails(){
    const orderId = (this.activatedRoute.snapshot.paramMap.get('id') as string);
    if(!orderId){
      return;
    }
    forkJoin(
      this.orderDetailsService.getOrders(orderId),
      this.orderDetailsService.getOrdersDetails(orderId)
    ).subscribe(([orderResponse, orderDetailsResponse]) => {
      this.order = orderResponse;
      this.orderDetails = orderDetailsResponse;
    });
    // this.orderDetailsService.getOrdersDetails(orderId).subscribe(response => {
    // })
  }

}
