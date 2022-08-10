import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '../shared/api.service';
import { imagesPathUrl } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService,) { }


  getProductsList(){
    return this.apiService.request("get","Products/GetAllProducts?businessId=0").pipe(map((response:any) => {
      return response && response.map((elm:any) =>{
        return {
          ...elm,
          productImageUrl:elm.productImage ? imagesPathUrl+"/images/"+elm.productImage:null
        }
      }) || [];
    }));
  }

  getCategoriesList(){
    return this.apiService.request("get","Categories/GetAllCategories?businessId=0").pipe(map((response:any) => {
      return response && response.filter((elm:any) => elm.active) || [];
    }));
  }
}
