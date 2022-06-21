import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/mock-api/category-data';
import { products } from 'src/app/mock-api/product-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/filters/cart-product.filter';
import { CartService } from 'src/app/shared/cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  cartProductsList:any[];

  selectedProduct:any

  categorylist:any[]
  menulist:any[]
  modelRef:any;
  constructor(private modalService: NgbModal, private cartService:CartService) { 

    this.categorylist = categories
    this.menulist = products

  }

  ngOnInit(): void {
  }




  OnAddToCart(){
    console.log(this.selectedProduct);
    this.cartProductsList = this.cartService.onCartUpdate(this.cartProductsList,this.selectedProduct);
    console.log(this.cartProductsList);
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


  onScroll(elem: string) {
    const element = document.querySelector(elem)!;
    const y = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
 }

 openModal(template: any, product:any) {
   console.log(product);
  this.selectedProduct = new Product(product);
 this.modelRef =  this.modalService.open(template,{
    size:'sm',
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
