import { Injectable } from '@angular/core';
import { Business } from '../modals/business.modal';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }



  setBusinessDetails(business:Business){
    localStorage.setItem("bussiness",JSON.stringify(business));
  }
  
  getBusinessDetails():Business{
    return JSON.parse(localStorage.getItem("bussiness") || '{}')
  }

}
