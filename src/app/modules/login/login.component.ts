import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName:string;
  password:string;

  get error(){
    return this.authService.error;
  }

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.SignIn(this.userName, this.password);
  }
}
