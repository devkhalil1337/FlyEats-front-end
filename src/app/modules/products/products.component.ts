import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../shared/cart.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { ProductsService } from './products.service';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { SelectionChoices, Selections } from 'src/app/filters/selections.model';
import { Product } from 'src/app/filters/product.model';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Variants } from 'src/app/filters/variants.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  businessInfo: any;
  CartInputs: CartItems;
  selectedProduct: Product;
  selections: any;
  categorylist: Array<Category> = [];
  menulist: any[] = [];
  modelRef: any;

  constructor(
    private modalService: NgbModal,
    private cartService: CartService,
    private localStorageServcice: LocalStorageService,
    private productService: ProductsService
  ) {
    this.businessInfo = this.localStorageServcice.getBusinessDetails();
    this.CartInputs = new CartItems();
    this.getUnitSubscribe();
  }

  ngOnInit(): void {}

  getUnitSubscribe() {
    forkJoin(
      this.productService.getProductsList(),
      this.productService.getCategoriesList()
    ).subscribe(([productResponse, categoryResponse]) => {
      this.categorylist = categoryResponse;
      this.menulist = productResponse;
    });
  }

  OnAddToCart() {
    this.CartInputs.products = this.cartService.onCartUpdate(
      this.selectedProduct,
      this.selections
    );
    this.onModalDismiss();
    this.CartInputs.updateTotalAmount();
  }

  onQuantityUpdate(type: string) {
    switch (type) {
      case 'increase':
        this.cartService.onQuantityIncrease(this.selectedProduct);
        break;
      case 'decrease':
        this.cartService.onQuantityDecrease(this.selectedProduct);
        break;
    }
  }

  onRemoveProduct(productId: number) {
    this.CartInputs.products = this.cartService.onRemoveProduct(productId);
    this.CartInputs.updateTotalAmount();
  }

  onScroll(elem: string) {
    const element = document.querySelector(elem)!;
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  openModal(template: any, product: Product) {
    this.selectedProduct = new Product();
    console.log(this.selectedProduct.productPrice)
    this.selectedProduct = { ...product };
    this.selections = new Array<Selections>();
    if (product.selectionId && product.selectionId.length > 0) {
      this.productService
        .getSelections(product.selectionId)
        .subscribe((response) => {
          if (this.cartService.isProductExists(this.selectedProduct)) {
          }
          this.selections = response;
        });
    }

    this.modelRef = this.modalService.open(template, {
      size: 'md',
      backdropClass: 'in',
      windowClass: 'modal-holder in',
      modalDialogClass: 'modal-dialog-centered',
    });
  }

  openAllergyModal(template: any) {
    this.modelRef = this.modalService.open(template, {
      windowClass: 'modal-holder in',
      backdropClass: 'in',
      modalDialogClass: 'modal-dialog-centered',
    });
  }

  onModalAction(results: any) {
    console.log(results);
  }

  onModalDismiss() {
    this.modelRef.close();
  }

  onItemChange($event: any, selectedChoice: SelectionChoices, selection: Selections) {
    selectedChoice.checked = $event.target.checked;
    let selectedChoicesLen = selection.selectionChoices.reduce((acc: any, cur: SelectionChoices) => (cur.checked ? ++acc : acc), 0);
    const choices = selection.selectionChoices
    choices.filter((element: SelectionChoices) => {
      if(selection.maximumSelection === selectedChoicesLen) {
        if(!element.checked) {
          element.isChecked = true;
        }
      } else if(element.isChecked) {
        element.isChecked = false;
      }
      if(selectedChoice.checked) {
        if(selectedChoice.choicesId === element.choicesId) {
          this.selectedProduct.productPrice += element.choicePrice;
        }
      } else if(selectedChoice.checked === false) {
        if(selectedChoice.choicesId === element.choicesId) {
          this.selectedProduct.productPrice -= element.choicePrice;
        }
      }
    });
  }

  isAllSelected($event: any, selectedVariant: Variants) {
    selectedVariant.checked = $event.target.checked;
    this.selectedProduct.productPrice = selectedVariant.variationPrice;
    this.selectedProduct.productName = selectedVariant.variationName;
    const variations = this.selectedProduct.productVariants;
    variations.filter((vari:Variants) =>{
      if(selectedVariant.variantId != vari.variantId)
        vari.checked = false;
    });
  }


  getProductAmount(product:Product){
    
  }

  
}
