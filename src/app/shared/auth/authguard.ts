import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // let role = route.data.role as 'admin' | 'user';

    const currentUser = this.authService.isLoggedIn;
    if (currentUser) {
      return true;
    }
    this._router.navigate(['login'], { queryParams: { returnUrl: state.url } })
    // // not logged in so redirect to login page with the return url
    // this.authService.logout();
    return false;
  }
}
