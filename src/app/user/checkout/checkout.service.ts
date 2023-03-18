import { Injectable } from '@angular/core';
import { OrderDetails } from '@models';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private apiService:ApiService) { }


  onSendOrder(Order:any){
    return this.apiService.request("post",`Order/AddNewOrder`,Order).toPromise();
  }
  
  onSendOrderDetails(Order:OrderDetails[]){
    return this.apiService.request("post",`OrderDetails/AddNewOrderDetails`,Order).toPromise();
  }
  
  
  onVoucherApply(voucher:string,userId:number,amount:number){
    return this.apiService.request("get",`Voucher/CheckVoucherRedemptionEligibility?voucherCode=${voucher}&userId=${userId}&billAmount=${amount}`);
  }

}
