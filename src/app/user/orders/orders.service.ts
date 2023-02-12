import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/modules/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private apiService:ApiService,) { }


  getOrdersList(){
    return this.apiService.request("get",`Order/GetOrdersByCustomerId?customerId=123`)
  }
}
