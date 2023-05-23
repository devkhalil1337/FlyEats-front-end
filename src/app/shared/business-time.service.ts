import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import * as moment from 'moment';
import { LocalStorageService } from './local-storage.service';
import { BusinessDay } from '../models/businessDay.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessTimeService {

  public isOpen = false;
  private isOpenSubject = new BehaviorSubject<boolean>(this.isOpen);
  weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thuresday','Friday','Saturday'];
  currentDay:any;
  constructor(private apiService: ApiService,private localStorageService: LocalStorageService) {

    this.currentDay = new Date().getDay(); // 0-6, Sunday = 0
   }

  getIsOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable()
  }

  async checkIsOpen(): Promise<void> {
    // Call the API to check if the business is open
    // and set the value of isOpen accordingly
    await  this.apiService.request("get","BusinessHours/GetBusinessHours").pipe(
      tap((businessResponse:BusinessDay[]) =>{
        this.localStorageService.setBusinessHours(businessResponse);
        let foundDay = businessResponse.find((el:BusinessDay) => el.weekDayName == this.weekDays[this.currentDay])
        if(foundDay){
          const isBusinessOn = this.isBusinessOpen(foundDay);
          this.isOpen = isBusinessOn;
          this.isOpenSubject.next(isBusinessOn)

        }
      })
    ).toPromise();
  }

  isBusinessOpen(day:BusinessDay):boolean {
    const now = new Date();
    // Find the business day object for today
    const businessDay = day;//this.businessHours.find((day:any) => day.weekDayName === weekDays[today]);
    // If the business is closed today, return false
    if (!businessDay || !businessDay.active) {
      return false;
    }
    return businessDay.businessTimes.some((time:any) => {
      if (businessDay) {
        const startTime = moment(time.startDate, 'HH:mm');
        const endTime = moment(time.endDate, 'HH:mm');
        const nowTime = moment(now, 'HH:mm');
        return nowTime.isBetween(startTime, endTime);
      }
      return false;
    });
    
  }
  

}
