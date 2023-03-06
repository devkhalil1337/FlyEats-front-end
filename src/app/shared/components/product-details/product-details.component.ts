import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '@shared/cart.service';
import { Product } from 'src/app/filters/product.model';
import { SelectionChoices, Selections } from 'src/app/filters/selections.model';
import { Variants } from 'src/app/filters/variants.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() selectedProduct:Product;
  @Input() selections:any;
  @Input() modelRef:any
  constructor(private cartService:CartService) { 
    this.selectedProduct = new Product();
  }

  ngOnInit(): void {
    console.log("Im product Details",this.selectedProduct)
  }


  OnAddToCart() {
    this.cartService.onCartUpdate(
      this.selectedProduct,
      this.selections
    );
    this.modelRef.close();
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


  onModalDismiss() {
    this.modelRef.close();
  }

}
