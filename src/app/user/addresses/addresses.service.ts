import { Injectable } from '@angular/core';
import { ApiService } from '@shared';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private apiService:ApiService) { }


  getActiveAddressesByUserId(userId: string) {
    const apiEndpoint = 'AddressBook/GetAddressesByUserId';
    const url = `${apiEndpoint}?userId=${userId}`;
    return this.apiService.request('get', url).pipe(
      map((response: any) => {
        return response.filter((elm:any) => elm.active) || [];
      })
    );
  }
  

 deleteAddress(addressId:number){
    return this.apiService.request("delete",`AddressBook/DeleteAddress/${addressId}`)
  }
}
