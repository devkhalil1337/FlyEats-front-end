import { Injectable } from '@angular/core';
import { User } from '@models';
import { ApiService,AuthService } from '@shared';

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
