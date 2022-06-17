import { Component, OnInit } from '@angular/core';
import { CustomService } from 'src/app/shared/custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  get isMobile(){
    return this.customService.isMobile();
  }

  constructor(private customService:CustomService) { }

  ngOnInit(): void {
  }

}
