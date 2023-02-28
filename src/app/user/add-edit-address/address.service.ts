import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';
import { ApiService } from '@shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apiService:ApiService) { }


  getAddressById(addressId: string) {
    return this.apiService.request("get",`AddressBook/GetAddressById/${addressId}`)
    
  }
  

 AddAddress(address:Address){
    return this.apiService.request("post",`AddressBook/AddNewAddress`,address)
  }

 EditAddress(address:Address){
    return this.apiService.request("put",`AddressBook/UpdateAddress`,address)
  }
}
