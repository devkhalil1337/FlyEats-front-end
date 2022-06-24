import { Component, OnInit } from '@angular/core';
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
  
  
  
  constructor(private authService:AuthService) { 
    console.log("logggied",this.authService.isLoggedIn)
  }

  ngOnInit(): void {
  }
  
  onSignOut(){
    this.authService.SignOut();
  }

}
