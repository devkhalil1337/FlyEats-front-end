import { Component, OnInit } from '@angular/core';
import { User } from '@models';
import { AuthService,CustomService } from '@shared';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string;
  password:string;
  user:User;
  get error(){
    return this.authService.error;
  }

  constructor(private customService:CustomService,private authService:AuthService) {
    this.user = new User();
   }

  ngOnInit(): void {
  }

  login() {
    this.authService.LoginUser(this.user)
  }
}
