import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product,Selections,Category } from '@models';
import { ApiService } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService:ApiService,) { }


  getProductsList(){
    return this.apiService.request("get",`Products/GetAllProducts`).pipe(map((response:any) => {
      return response && response.map((elm:Product) =>{
        return {
          ...elm,
          productTotalAmount:0
          // productImageUrl:elm.productImage ? imagesPathUrl+"/images/"+elm.productImage:null,
        }
      }) || [];
    }));
  }

  getCategoriesList(){
    return this.apiService.request("get",`Categories/GetAllCategories`).pipe(map((response:Array<Category>) => {
      return response && response.filter((elm:any) => elm.active) || [];
    }));
  }


  getSelections(selections:Array<number>){
    return this.apiService.request("post","Selections/GetMultipleSelectionsById",selections).pipe(map((response:Array<Selections>) => {
      return response || [];
    }));
  }

}
