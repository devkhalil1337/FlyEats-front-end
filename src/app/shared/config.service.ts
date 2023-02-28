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

}


export const imagesPathUrl = environment.imagesPathUrl

export const BusinessId = environment.BusinessId;