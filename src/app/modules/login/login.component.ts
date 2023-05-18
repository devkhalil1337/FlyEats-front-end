import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  returnUrl: string;
  errorMessage:string;
  get error(){
    return this.authService.error;
  }

  constructor(private customService:CustomService,private authService:AuthService,private route: ActivatedRoute) {
    this.user = new User();
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.errorMessage = "";
    this.authService.LoginUser(this.user,this.returnUrl).then((response:any) => {
      if(response.message){
        this.errorMessage = response.message
      }
    },(error) => {
      this.errorMessage = error;
    });
  }
}
