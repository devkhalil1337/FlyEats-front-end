import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/user/auth/auth.service';
import { CustomService } from '../shared/custom.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:string;
  emailAddress:string;
  phoneNumber:string;
  password:string;
  user:User;
  get isMobile(){
    return this.customService.isMobile();
  }

  get error(){
    return this.authService.error;
  }

  constructor(private customService:CustomService,private authService:AuthService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }


  onSignup(){
    this.authService.SignUp(this.user).subscribe(response => {
      console.log({response})
      this.authService.LoginUser(this.user);
    })
  }

}
