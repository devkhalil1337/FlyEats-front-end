import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Business } from './modals/business.modal';
import { CacheService } from './shared/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JeM-Web-Ordering';

  businessInput:any;

  constructor(private appService:AppService,private cacheService:CacheService) {

    this.getBussiness();

   }

  getBussiness(){
    this.appService.getBussiness().subscribe(response => {
      this.businessInput = new Business(response);
      this.cacheService.setBusinessDetails(this.businessInput);
    })
  }

}
