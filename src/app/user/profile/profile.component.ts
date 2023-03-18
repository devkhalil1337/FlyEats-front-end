import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@models';
import { AuthService } from '../../shared/auth/auth.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user:User;
  constructor(private profileService:ProfileService,private authService:AuthService) {
    this.user = new User();
   }
  
  ngOnInit(): void {
    this.getProfileById();
  }
  

  getProfileById(){
    this.profileService.getProfileById().subscribe(response => {
      this.user = response;
    })
  }

  onUpdateProfile(){
    this.profileService.OnUpdateProfile(this.user).subscribe(response => {
      this.authService.SetUserData(this.user);
      alert("Profile Has been updated");
    })
  }

  ngOnDestroy(): void {
  }

}
