import { Injectable } from '@angular/core';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private apiService:ApiService,) { }


  getOrdersDetails(orderId:string){
    return this.apiService.request("get",`OrderDetails/GetProductsById?OrderId=${orderId}`)
  }

  getOrders(orderId:string){
    return this.apiService.request("get",`Order/GetOrderById?orderId=${orderId}`)
  }
}
