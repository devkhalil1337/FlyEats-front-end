import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const businessId = String(environment.BusinessId); // replace with your business id

    // Clone the request and add the businessId header
    const modifiedReq = request.clone({
      headers: request.headers.set('businessId', businessId)
    });

    return next.handle(modifiedReq);
    return next.handle(request);
  }
}