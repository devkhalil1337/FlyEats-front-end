import { Injectable } from '@angular/core';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Product } from 'src/app/filters/product.model';
import { Variants } from 'src/app/filters/variants.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItems;

  get CartItemsLastId() {
    return this.cartItems.products.length + 1;
  }

  constructor() {
    this.cartItems = new CartItems();
  }

  ngOnChanges() {
    console.log('Checked', this.cartItems);
  }

  onQuantityIncrease(product: any) {
    return product.quantity > 0 ? product.quantity++ : 1;
  }

  onQuantityDecrease(product: any) {
    return product.quantity > 1 ? product.quantity-- : 1;
  }

  onRemoveProduct(productId: number) {
    return (this.cartItems.products = this.cartItems.products.filter(
      (elm) => elm.cartId != productId
    ));
  }

  onCartUpdate(product: Product, selectionProduct?: any) {
    if (selectionProduct.length > 0)
        product.selectionChoices = this.extractCheckedModiferProducts(selectionProduct);
    if(product.productVariants.length > 0){
        product.productVariants = this.extractCheckedVariantProducts(product);
    }

    if (!this.cartItems || this.cartItems.products.length == 0) {
      product.cartId = this.CartItemsLastId;
      this.isVeriationProduct(product);
      this.cartItems.products.push(product);
    } else {
      this.isVeriationProduct(product);
      let isNewProduct = false;
      let index = this.cartItems.products.findIndex(
        (elm) => elm.cartId == product.cartId
      );                                                                                                                                                                                                   
      if (index != -1) {
        const product = this.cartItems.products[index];
        product.quantity += Number(product.quantity);
        isNewProduct = false;
      } else {
        isNewProduct = true;
      }
      if (isNewProduct) {
        product.cartId = this.CartItemsLastId;
        this.cartItems.products.push(product);
      }
    }
    localStorage.setItem('CartInputs', JSON.stringify(this.cartItems));
    return this.cartItems.products;
  }

  isProductExists(product: Product) {
    return this.cartItems.products.every((elm) => {
      if (elm && elm.selectionChoices && elm.selectionChoices.length > 0) {
      }
    });
  }

  isVeriationProduct(product: Product){
    if(product.productVariants.length > 0){
      const selectedVariationProduct = product.productVariants.find(prod => prod.checked);
      if(selectedVariationProduct){
        product.productName = selectedVariationProduct?.variationName;
        product.productDeliveryPrice = selectedVariationProduct.variationPrice;
      }
    }
  }

 private extractCheckedModiferProducts(selectionProduct: any) {
    let selections: any[] = [];
    selectionProduct.forEach((element: any, index: number) => {
      selections[index] = element.selectionChoices.filter(
        (elm: any) => elm.checked
      );
    });
    const singleArray = selections.reduce((a, b) => a.concat(b), []);
    return singleArray;
  }

  private extractCheckedVariantProducts(VariantProduct: Product) {
    return VariantProduct.productVariants.filter((veriant:Variants) => veriant.checked);
  }
}
