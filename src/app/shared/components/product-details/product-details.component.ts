 import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '@shared';
import { Product,SelectionChoices, Selections,Variants } from '@models';
import { ProductsService } from 'src/app/modules/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() selectedProduct:Product;
  @Input() selections:any;
  @Input() modelRef:any

  productForm: FormGroup;


  get productSelections():Array<Selections>{
    return this.productForm.get("selections")?.value || [];
  }

  get productVariants():Array<Variants>{
    return this.productForm.get("productVariants")?.value || [];
  }

  constructor(private cartService:CartService,private fb: FormBuilder,
    private productService:ProductsService) { 
    this.selectedProduct = new Product();
    this.selections = new Array<Selections>();
    this.productForm = this.fb.group({
      productId: [''],
      businessId: [''],
      categoryId: [''],
      selectionId: [[]],
      categoryName: [''],
      productName: [''],
      productDescription: [''],
      productImage: [''],
      productSortOrder: [0],
      productQuantity: [0],
      isTableProduct: [false],
      tablePrice: [0],
      tableVat: [0],
      isPickupProduct: [false],
      pickupPrice: [0],
      pickupVat: [0],
      isDeliveryProduct: [true],
      deliveryPrice: [0],
      deliveryVat: [0],
      hasVariations: [true],
      featured: [true],
      quantity: [1],
      productTotalAmount: [0],
      productVariants: [],
      selections:[],
      createDate: [''],
      modifyDate: [''],
      isDeleted: [false],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.getSelections();
    this.productForm.patchValue(this.selectedProduct);
  }     
  

  getSelections(){
    if(this.selectedProduct.selectionId.length == 0)
      return;
    this.productService
        .getSelections(this.selectedProduct.selectionId)
        .subscribe((response) => {
          // this.selections = response;
          this.productForm.patchValue({
            selections:response
          });
        });
  }


  OnAddToCart() {
    this.cartService.onCartUpdate(
      this.selectedProduct,
      this.productSelections
    );
    this.modelRef.close();
  }

  onQuantityUpdate(type: string) {
    let productPrice : number = this.selectedProduct.deliveryPrice || 0;
    if(this.selectedProduct.hasVariations && this.selectedProduct.productVariants?.length > 0){
      productPrice = this.selectedProduct?.productVariants?.find((el:Variants )=> el.checked)?.variationPrice || 0
    }
    switch (type) {
      case 'increase':
        debugger
        this.selectedProduct.quantity > 0 ? this.selectedProduct.quantity++ : 1;
        this.selectedProduct.productTotalAmount = productPrice;
        this.selectedProduct.productTotalAmount *= this.selectedProduct.quantity;
        this.getTheSumOfSelectedChoices();
        break;
        case 'decrease':
          if(this.selectedProduct.quantity == 1)
            return;
        this.selectedProduct.quantity > 0 ? this.selectedProduct.quantity-- : 1;
        this.selectedProduct.productTotalAmount = productPrice;
        this.selectedProduct.productTotalAmount *= this.selectedProduct.quantity;
        this.getTheSumOfSelectedChoices();
        break;
    }
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
          this.selectedProduct.productTotalAmount += element.choicePrice * this.selectedProduct.quantity;
        }
      } else if(selectedChoice.checked === false) {
        if(selectedChoice.choicesId === element.choicesId) {
          this.selectedProduct.productTotalAmount -= element.choicePrice * this.selectedProduct.quantity;
        }
      }
    });
  }

  onVariantItemSelect($event: any, selectedVariant: Variants) {
    selectedVariant.checked = $event.target.checked;
    this.selectedProduct.productTotalAmount = selectedVariant.variationPrice * this.selectedProduct.quantity;
    this.selectedProduct.productName = selectedVariant.variationName;
    const variations = this.selectedProduct.productVariants;
    variations.filter((vari:Variants) =>{
      if(selectedVariant.variantId != vari.variantId)
        vari.checked = false;
    });
    this.getTheSumOfSelectedChoices();
  }
  

  private getTheSumOfSelectedChoices(){
    const checkedChoicesSumAmount = this.productSelections.reduce((acc:any, curr:any) => {
      curr.selectionChoices.forEach((choice:SelectionChoices) => {
        if (choice.checked) {
          acc += choice.choicePrice * this.selectedProduct.quantity;
        }
      });
      return acc;
    }, 0);
    if(checkedChoicesSumAmount > 0){
      this.selectedProduct.productTotalAmount += checkedChoicesSumAmount;
    }
  }


  onModalDismiss() {
    this.modelRef.close();
  }

}
