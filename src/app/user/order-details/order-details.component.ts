import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderDeatils } from 'src/app/mock-api/order-details';
import { OrderDetailsService } from './order-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


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
    this.orderDetailsService.getOrdersDetails(orderId).subscribe(response => {
      this.orderDetails = response;
    })
  }

}
