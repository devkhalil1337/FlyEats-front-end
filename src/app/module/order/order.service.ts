import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:ApiService) { }



  getCategories(): Observable<any> {
    let compid = environment.compId;
    return this.http.request("get",`getRestaurentCategories?compid=${compid}`).pipe(map(response => {
      return response || [];
    }))
  }

  getItems(): Observable<any> {
    return this.http.request("get",`getMenuItemList`).pipe(map(response => {
      return response || [];
    }))
  }

  getModifierItems(itemId:number): Observable<any> {
    return this.http.request("get",`ProductSelections?MenuItem_ID=${itemId}`).pipe(map(response => {
      return response || [];
    }))
  }
}
