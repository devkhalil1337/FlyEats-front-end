import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from '@models';
import { AuthService } from '@shared';
import { AddressService } from './address.service';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.css']
})
export class AddEditAddressComponent implements OnInit {

  selectedAddressId:string;
  selectedAddress:Address;
  constructor(private addressService:AddressService, private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedAddressId = params['id'];
      if(this.selectedAddressId)
        this.getAddressById();
    });
    this.selectedAddress = new Address();
    this.selectedAddress.userId = this.authService.userId;
  }

  ngOnInit(): void {
  }

  
  getAddressById(){
    this.addressService.getAddressById(this.selectedAddressId).subscribe((response:any) => {
      console.log(response);
      this.selectedAddress = response;
      console.log(this.selectedAddress)
    })
  }

  onAddressSave(){
    if(this.selectedAddressId){
      this.addressService.EditAddress(this.selectedAddress).subscribe((response:any) => {
        console.log(response);
        this.router.navigate(['/user/addresses'])
      })
    }else{
      this.addressService.AddAddress(this.selectedAddress).subscribe((response:any) => {
        console.log(response);
        this.router.navigate(['/user/addresses'])
      })
    }
  }

}
