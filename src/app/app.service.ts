import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService,imagesPathUrl } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:ApiService) { }



  getBussiness(): Observable<any> {
    return this.http.request("get",`BusinessInfo/GetBusinessUnitById`).pipe(map(response => {
      return response && response.map((elm:any) =>{
        return {
          ...elm,
          productImageUrl:elm.businessLogo ? imagesPathUrl+"/images/"+elm.businessLogo:null
        }
      })[0] || [];
    }));
  }

  getBussinessSettings(): Observable<any> {
    return this.http.request("get",`Settings/GetSettingsById`).pipe(map(response => {
      return response && response[0] || {}
    }));
  }

}
