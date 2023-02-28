import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ApiService } from '@shared/api.service';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  isVerifyEmail:boolean = false;
  error:any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private apiService:ApiService
  ) {
    const user = JSON.parse(localStorage.getItem('user')!)
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      ;
    } else {
      localStorage.setItem('user', 'null');
      JSON.parse(localStorage.getItem('user')!);
    }

    // this.afAuth.authState.subscribe((user) => {
    //   this.error = null;
    // });
  }

  onMyOrders(){
    this.router.navigate(['user/orders']);
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['products']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        this.error = error;
        // window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(user:User) {
    return this.apiService.request("post",`User/AddNewUser`,user)
    // return this.afAuth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     this.SignIn(email,password);
    //     // this.SendVerificationMail();
    //     this.SetUserData(result.user);
    //   })
    //   .catch((error) => {
    //     this.error = error;
    //     // window.alert(error.message);
    //   });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    // return this.afAuth.currentUser
    //   .then((u: any) => u.sendEmailVerification())
    //   .then(() => {
    //     this.isVerifyEmail = true;
    //     this.router.navigate(['login']);
    //   });
      
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null //&& user.emailVerified !== false ? true : false;
  }

  get userDisplayname(){
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && (user.firstName + ' ' + user.lastName) || ""
  }
  get userEmail(){
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && (user.email) || ""
  }

  get userId(){
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.userId;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['products']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['products']);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  
  LoginUser(user: User) {
    return this.apiService.request("post", `User/LoginUser`, user).subscribe(
      (response: User) => {
        this.ngZone.run(() => {
          this.router.navigate(['products']);
        });
        this.SetUserData(response);
      },
      (error: any) => {
        console.log(error);
        window.alert("An error occurred while logging in. Please try again later.");
      }
    );
  }
  
  
  SetUserData(user: User) {
    localStorage.setItem("user",JSON.stringify(user));
    // debugger
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.userId}`
    // );
    // const userData: User = {
    //   userId: user.userId,
    //   email: user.email,
    //   firstName: user.lastName,
    //   lastName: '',
    //   phoneNumber: '',
    //   businessId: 0,
    //   password: ''
    // };
    // return userRef.set(userData, {
    //   merge: true,
    // });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}