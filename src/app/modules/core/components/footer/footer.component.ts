import { Component, OnInit } from '@angular/core';
import { ConfigService} from "@shared/config.service"
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  BusinessDetails:any;
  constructor(private ConfigService: ConfigService) { 
    this.BusinessDetails = this.ConfigService.BusinessDetails;
  }

  ngOnInit(): void {
  }

}
