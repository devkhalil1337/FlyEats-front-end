import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setBusinessDetails(business:any){
    localStorage.setItem("business",JSON.stringify(business));
  }

  getBusinessDetails(){
    return JSON.parse(localStorage.getItem("business") || '{}')
  }

}
