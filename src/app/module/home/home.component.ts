import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/modals/business.modal';
import { CacheService } from 'src/app/shared/cache.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  businessInput:Business;

  constructor(private homeService:HomeService,private cacheService:CacheService) { 
    this.businessInput = this.cacheService.getBusinessDetails();
  }

  ngOnInit(): void {
  }

}
