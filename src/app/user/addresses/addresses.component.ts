import { Component, OnInit } from '@angular/core';
import { address } from 'src/app/mock-api/address';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {


  addressesList:any

  constructor(private addressesService:AddressesService) {
    // this.addressesList = address
    this.getAddresses();
   }

  ngOnInit(): void {
  }

  getAddresses(){
    this.addressesService.getActiveAddressesByUserId('1').subscribe(response => {
      console.log({response})
      this.addressesList = response;
    })
  }

  onDeleteAddress(addressId:number){
    this.addressesService.deleteAddress(addressId).subscribe(response => {
      this.getAddresses();
    })
  }

}
