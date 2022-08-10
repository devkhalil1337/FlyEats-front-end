import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/mock-api/category-data';
import { products } from 'src/app/mock-api/product-data';
import { Product } from 'src/app/filters/cart-product.filter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../shared/cart.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { ProductsService } from './products.service';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  businessInfo:any;

  cartProductsList:any;

  selectedProduct:any

  categorylist:Array<Category> = [];
  menulist:any[] = [];
  modelRef:any;
  constructor(private modalService: NgbModal, private cartService:CartService,
    private localStorageServcice:LocalStorageService,
    private productService:ProductsService) { 
    this.businessInfo = this.localStorageServcice.getBusinessDetails();
    this.getUnitSubscribe();
  }

  ngOnInit(): void {
  }


  getUnitSubscribe(){
    forkJoin(
      
      this.productService.getProductsList(), 
      this.productService.getCategoriesList()
      
      ).subscribe(([productResponse, categoryResponse]) => {
      this.categorylist = categoryResponse
      this.menulist = productResponse;    
     });
  }



  OnAddToCart(){
    this.cartProductsList = this.cartService.onCartUpdate(this.cartProductsList,this.selectedProduct);
    this.onModalDismiss();
  }

  onQuantityUpdate(type:string){
    switch(type){
      case 'increase':
        this.cartService.onQuantityIncrease(this.selectedProduct);
        break;
      case 'decrease':
        this.cartService.onQuantityDecrease(this.selectedProduct);
        break;
    }
  }

  onRemoveProduct(productId:number){
    this.cartProductsList = this.cartService.onRemoveProduct(this.cartProductsList,productId);
  }


  onScroll(elem: string) {
    const element = document.querySelector(elem)!;
    const y = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
 }

 openModal(template: any, product:any) {
 this.selectedProduct = new Product(product);
 if(product.selectionId && product.selectionId.length > 0){
  this.productService.getSelections(product.selectionId).subscribe(response => {
    console.log(response);
  })
 }

 this.modelRef =  this.modalService.open(template,{
    size:'sm',
    backdropClass:'in',
    windowClass:'modal-holder in',
    modalDialogClass:'modal-dialog-centered'
  });
}

openAllergyModal(template: any) {
  this.modelRef =  this.modalService.open(template,{
     windowClass:'modal-holder in',
     backdropClass:'in',
     modalDialogClass:'modal-dialog-centered'
   });
 }

onModalAction(results:any){
  console.log(results)
}

onModalDismiss(){
  this.modelRef.close()
}


}
