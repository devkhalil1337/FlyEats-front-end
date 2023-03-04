import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BusinessDay } from '../models/businessDay.model';

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
  
  get BusinessHours(){
    let businessHours = JSON.parse(localStorage.getItem("businessHours") || "{}");
    if(!businessHours || Object.entries(businessHours).length == 0){
      businessHours = new Array<BusinessDay>()
    }
    return businessHours
  }

}


export const imagesPathUrl = environment.imagesPathUrl

export const BusinessId = environment.BusinessId;