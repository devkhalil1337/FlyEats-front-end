import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '@shared/cart.service';
import { LocalStorageService } from '@shared/local-storage.service';
import { ProductsService } from './products.service';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { SelectionChoices, Selections } from 'src/app/filters/selections.model';
import { Product } from 'src/app/filters/product.model';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Variants } from 'src/app/filters/variants.model';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { ConfigService } from '@shared/config.service';
import { BusinessTimeService } from '@shared/business-time.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  businessInfo: any;
  businessSettings: any;
  CartInputs: CartItems;
  selectedProduct: Product;
  selections: any;
  categorylist: Array<Category> = [];
  menulist: any[] = [];
  modelRef: any;
  isLoading:boolean = false;
  isBusinessOn:boolean = false;

  constructor(
    private modalService: NgbModal,
    private cartService: CartService,
    private localStorageServcice: LocalStorageService,
    private productService: ProductsService,
    private configService: ConfigService,
    private businessTimeService: BusinessTimeService
  ) {
    this.businessInfo = this.configService.BusinessDetails;
    this.businessSettings = this.configService.BusinessSettings;
    this.getUnitSubscribe();
    this.businessTimeService.checkIsOpen();
  }

  ngOnInit(): void {
    this.businessTimeService.getIsOpen().subscribe(isopen => this.isBusinessOn = isopen);
  }

  ngOnDestroy() {
    // Unsubscribe from the isOpen$ observable when the component is destroyed
  }

  getUnitSubscribe() {
    this.isLoading = true;
    forkJoin(
      this.productService.getProductsList(),
      this.productService.getCategoriesList()
    ).subscribe(([productResponse, categoryResponse]) => {
      this.categorylist = categoryResponse;
      this.menulist = productResponse;
      this.isLoading = false;
    },(error) => {
      this.isLoading = false;
      console.log(error);
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
        this.selectedProduct.quantity > 0 ? this.selectedProduct.quantity++ : 1;
        this.selectedProduct.productPrice = this.selectedProduct.deliveryPrice;
        this.selectedProduct.productPrice *= this.selectedProduct.quantity;
        this.getTheSumOfSelectedChoices();
        break;
        case 'decrease':
          if(this.selectedProduct.quantity == 1)
            return;
        this.selectedProduct.quantity > 0 ? this.selectedProduct.quantity-- : 1;
        this.selectedProduct.productPrice = this.selectedProduct.deliveryPrice;
        this.selectedProduct.productPrice *= this.selectedProduct.quantity;
        this.getTheSumOfSelectedChoices();
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
    console.log({product})
    this.selectedProduct = { ...product };
    if(product.productVariants.length > 0){
      this.selectedProduct.productVariants[0].checked = true;
      // this.selectedProduct.productPrice = product.productVariants[0].variationPrice;
    }else{
      this.selectedProduct.productPrice = product.deliveryPrice;
    }
    console.log(this.selectedProduct)
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

  onChoiceItemSelect($event: any, selectedChoice: SelectionChoices, selection: Selections) {
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

  onVariantItemSelect($event: any, selectedVariant: Variants) {
    selectedVariant.checked = $event.target.checked;
    this.selectedProduct.productPrice = selectedVariant.variationPrice * this.selectedProduct.quantity;
    this.selectedProduct.productName = selectedVariant.variationName;
    const variations = this.selectedProduct.productVariants;
    variations.filter((vari:Variants) =>{
      if(selectedVariant.variantId != vari.variantId)
        vari.checked = false;
    });
    this.getTheSumOfSelectedChoices();
  }


  getProductAmount(product:Product){
    
  }

  onOrderTypeChange(orderType:any){
    this.isLoading = true;
   switch(orderType.target.value){
      case OrderTypes.Delivery:
        this.CartInputs.orderType = OrderTypes.Delivery;
        this.cartService.setOrderType(OrderTypes.Delivery);
        this.CartInputs.clearTable();
        break;
      case OrderTypes.PickUp:
        this.CartInputs.orderType = OrderTypes.PickUp;
        this.cartService.setOrderType(OrderTypes.PickUp);
        this.CartInputs.clearTable();
        break;
      case OrderTypes.Table:
        this.CartInputs.orderType = OrderTypes.Table;
        this.cartService.setOrderType(OrderTypes.Table);
        break;
    }
    setTimeout(() => this.isLoading = false,100)
    this.CartInputs.clearCart();
  }

  private getTheSumOfSelectedChoices(){
    const checkedChoicesSumAmount = this.selections.reduce((acc:any, curr:any) => {
      curr.selectionChoices.forEach((choice:SelectionChoices) => {
        if (choice.checked) {
          acc += choice.choicePrice;
        }
      });
      return acc;
    }, 0);
    if(checkedChoicesSumAmount > 0){
      this.selectedProduct.productPrice += checkedChoicesSumAmount;
    }
  }


  onloadPage($event: any){
    this.CartInputs = new CartItems();
    this.CartInputs = $event;
    this.cartService.setCartItems($event);
  }

  onTableNumber($event:any){
    this.CartInputs.tableNumber = $event;
    this.onModalDismiss();
  }


  
  
}
