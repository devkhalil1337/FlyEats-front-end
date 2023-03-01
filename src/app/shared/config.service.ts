import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }


  get selectedCurrency(){
    const {businessCurrency} = JSON.parse(localStorage.getItem("business") || "USD");
    return businessCurrency;
  }

  get BusinessDetails(){
    const businessDetails = JSON.parse(localStorage.getItem("business") || "{}");
    return businessDetails;
  }

  get BusinessSettings(){
    return JSON.parse(localStorage.getItem("businessSettings") || "{}");
  }

}


export const imagesPathUrl = environment.imagesPathUrl

export const BusinessId = environment.BusinessId;