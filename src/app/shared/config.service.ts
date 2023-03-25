import { Injectable } from '@angular/core';
import { Settings } from '@models';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
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

  get BusinessSettings():Settings{
    let details = JSON.parse(localStorage.getItem("businessSettings") || "{}")
    if(!details || Object.entries(details).length == 0)
       details =  new Settings();
    return details;
  }
  
  get BusinessHours(){
    let businessHours = JSON.parse(localStorage.getItem("businessHours") || "{}");
    if(!businessHours || Object.entries(businessHours).length == 0){
      businessHours = new Array<BusinessDay>()
    }
    return businessHours
  }

  getNgbModalOptions(size: 'sm' | 'md' | 'lg' | 'llg' | 'xl' | 'xxl' = 'md', easyClose: boolean = false): NgbModalOptions {
    const config: NgbModalOptions = {
      backdrop: easyClose || 'static',
      keyboard: easyClose,
    };
    if (size !== 'md') {
      config.size = size as any;
    }

    return config;
  }

  get BusinessId():number{
     return environment.BusinessId;
  }
}


export const imagesPathUrl = environment.imagesPathUrl

export const BusinessId = environment.BusinessId;