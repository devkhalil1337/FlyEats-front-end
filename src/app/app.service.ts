import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './modules/shared/api.service';
import { imagesPathUrl } from './modules/shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:ApiService) { }



  getBussiness(): Observable<any> {
    const BusinessId = environment.BusinessId;
    return this.http.request("get",`BusinessInfo/GetBusinessUnitById?BusinessId=${BusinessId}`).pipe(map(response => {
      return response && response.map((elm:any) =>{
        return {
          ...elm,
          productImageUrl:elm.businessLogo ? imagesPathUrl+"/images/"+elm.businessLogo:null
        }
      })[0] || [];
    }));
  }

}
