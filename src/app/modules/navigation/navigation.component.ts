import { Component, OnInit } from '@angular/core';
import { CustomService } from 'src/app/shared/custom.service';
import { AuthService } from 'src/app/user/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  get IsUserLoggedIn(){
    return this.authService.isLoggedIn;
  }

  get userDisplayName(){
    return this.authService.userDisplayname
  }
  
  get isMobile(){
    return this.customService.isMobile();
  }
  
  
  constructor(private authService:AuthService,private customService:CustomService) {}

  ngOnInit(): void {
  }
  
  
  onSignOut(){
    this.authService.SignOut();
  }

}
