import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './modules/shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:ApiService) { }



  getBussiness(): Observable<any> {
    let compid = environment.compId;
    return this.http.request("get",`GetResutarents?compid=${compid}`).pipe(map(response => {
      return response && response[0] || {};
    }))
  }

}
