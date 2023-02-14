import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/modules/shared/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private apiService:ApiService,private authService:AuthService) { }


  getOrdersList(){
    return this.apiService.request("get",`Order/GetOrdersByCustomerId?customerId=${this.authService.userId}`)
  }
}
