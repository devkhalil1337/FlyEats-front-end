import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/filters/product.model';
import { Selections } from 'src/app/filters/selections.model';
import { Variants } from 'src/app/filters/variants.model';
import { Category } from 'src/app/models/category.model';
import { ApiService } from '../shared/api.service';
import { BusinessId, imagesPathUrl } from '../shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService,) { }


  getProductsList(){
    return this.apiService.request("get",`Products/GetAllProducts?businessId=${BusinessId}`).pipe(map((response:any) => {
      return response && response.map((elm:Product) =>{
        return {
          ...elm,
          productPrice:0,
          productImageUrl:elm.productImage ? imagesPathUrl+"/images/"+elm.productImage:null,
        }
      }) || [];
    }));
  }

  getCategoriesList(){
    return this.apiService.request("get",`Categories/GetAllCategories?businessId=${BusinessId}`).pipe(map((response:Array<Category>) => {
      return response && response.filter((elm:any) => elm.active) || [];
    }));
  }


  getSelections(selections:Array<number>){
    return this.apiService.request("post","Selections/GetMultipleSelectionsById",selections).pipe(map((response:Array<Selections>) => {
      return response || [];
    }));
  }

}
