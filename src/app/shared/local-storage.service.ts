import { Injectable } from '@angular/core';
import { BusinessDay } from '../models/businessDay.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { 
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }


  storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      localStorage.clear();
      window.location.href = '/'; 
      // Handle the changes to the local storage here
    }
  }

  setBusinessDetails(business:any){
    localStorage.setItem("business",JSON.stringify(business));
  }

  getBusinessDetails(){
    return JSON.parse(localStorage.getItem("business") || '{}')
  }

  setBusinessSettings(business:any){
    localStorage.setItem("businessSettings",JSON.stringify(business));
  }

  setBusinessHours(business:BusinessDay[]){
    localStorage.setItem("businessHours",JSON.stringify(business));
  }

  getBusinessHours(){
    return JSON.parse(localStorage.getItem("businessHours") || '{}')
  }

  getBusinessSettings(){
    return JSON.parse(localStorage.getItem("businessSettings") || '{}')
  }

  getDeliveryCharges(){
    const business = JSON.parse(localStorage.getItem("businessSettings") || '{}');

     return business.MinimumOrder || 0;
  }

  getCartInputs(){
    return JSON.parse(localStorage.getItem("CartInputs") || '{}');
  }



}
