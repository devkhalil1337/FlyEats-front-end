import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor() { }



  isMobile():boolean{
    return !!navigator.userAgent.match(/iPhone | iPad | iPod | Android/i)
  }

}
