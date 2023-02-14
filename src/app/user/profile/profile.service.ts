import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/modules/shared/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService:ApiService,private authService:AuthService) { }

  getProfileById(){
    return this.apiService.request("get",`User/GetUserById/${this.authService.userId}`);
  }

  OnUpdateProfile(user:User){
    return this.apiService.request("put",`User/UpdateUser`,user);
  }
}
