import { Component, OnInit } from '@angular/core';
import { ConfigService} from "@shared/config.service"
import * as moment from 'moment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  BusinessDetails:any;
  businessHours:any;
  weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thuresday','Friday','Saturday'];
  currentDay:any;
  constructor(private ConfigService: ConfigService) { 
    this.BusinessDetails = this.ConfigService.BusinessDetails;
    this.businessHours = this.ConfigService.BusinessHours;
    this.currentDay = new Date().getDay(); // 0-6, Sunday = 0
  }

  ngOnInit(): void {
  }

  isBusinessOpen(day:any) {
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
