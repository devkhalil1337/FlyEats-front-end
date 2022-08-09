import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService) { }


  getProductsList(){
    return this.apiService.request("get","Products/GetAllProducts?businessId=0");
  }

  getCategoriesList(){
    return this.apiService.request("get","Categories/GetAllCategories?businessId=0");
  }
}
