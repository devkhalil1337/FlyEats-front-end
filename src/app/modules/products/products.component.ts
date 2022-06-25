import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/mock-api/category-data';
import { products } from 'src/app/mock-api/product-data';
import { Product } from 'src/app/filters/cart-product.filter';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../shared/cart.service';
import { LocalStorageService } from '../shared/local-storage.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  businessInfo:any;

  cartProductsList:any;

  selectedProduct:any

  categorylist:any[]
  menulist:any[]
  modelRef:any;
  constructor(private modalService: NgbModal, private cartService:CartService,
    private localStorageServcice:LocalStorageService) { 
    this.businessInfo = this.localStorageServcice.getBusinessDetails();
    this.categorylist = categories
    this.menulist = products

  }

  ngOnInit(): void {
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
