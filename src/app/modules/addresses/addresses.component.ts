import { Component, OnInit } from '@angular/core';
import { address } from 'src/app/mock-api/address';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {


  addressesList:any

  constructor() {
    this.addressesList = address
   }

  ngOnInit(): void {
  }


}
