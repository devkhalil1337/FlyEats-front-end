import { Injectable } from '@angular/core';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { ApiService } from 'src/app/modules/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private apiService:ApiService) { }


  onSendOrder(Order:any){
    return this.apiService.request("post",`Order/AddNewOrder`,Order);
  }
  
  onSendOrderDetails(Order:OrderDetails[]){
    return this.apiService.request("post",`OrderDetails/AddNewOrderDetails`,Order);
  }

}
