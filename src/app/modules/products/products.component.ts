import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from './products.service';
import { forkJoin } from 'rxjs';
import { Product,CartItems,Category } from '@models';
import { OrderTypes } from 'src/app/enums/OrderTypeEnum';
import { ConfigService,ModalService,LocalStorageService,CartService,BusinessTimeService } from '@shared';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  @ViewChild('productModal') productModal: ElementRef
  
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
    private modalService: ModalService,

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

  onRemoveProduct(productId: number) {
    this.cartService.onRemoveProduct(productId);
    this.CartInputs.updateTotalAmount();
  }

  onScroll(elem: string) {
    const element = document.querySelector(elem)!;
    const y = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  openModal(product: Product) {
    this.selectedProduct = new Product();
    this.selectedProduct = { ...product };
    if(product.productVariants.length > 0){
      this.selectedProduct.productVariants[0].checked = true;
      // this.selectedProduct.productPrice = product.productVariants[0].variationPrice;
    }else{
      this.selectedProduct.productPrice = product.deliveryPrice;
    }

    this.modelRef = this.modalService.openModal(this.productModal,'md',false,false,'modal-holder in');
  }

  openAllergyModal(template: any) {
    this.modelRef = this.modalService.openModal(template,'md',false,false,'modal-holder in');
  }

  onModalAction(modalVar:any){
    modalVar();
  }

  onModalDismiss(modalVar?:any) {
    modalVar();
  }


  onOrderTypeChange(orderType:any){
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
    this.CartInputs.clearCart();
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
