import { Component } from '@angular/core';
import { AppService } from './app.service';
import { LocalStorageService } from '@shared/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Foodpicky';

  constructor(private appService:AppService, private localStorageService:LocalStorageService) {

    this.appService.getBussiness().subscribe(response => {
      this.localStorageService.setBusinessDetails(response);
    })
    this.appService.getBussinessSettings().subscribe(response => {
      this.localStorageService.setBusinessSettings(response);
    })

    this.appService.getBussinessHours().subscribe(response => {
      this.localStorageService.setBusinessHours(response);
    })

   }


}
