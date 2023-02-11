import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Product } from 'src/app/filters/product.model';
import { Variants } from 'src/app/filters/variants.model';
import { Order } from 'src/app/models/order.model';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnChanges{
  cartItems: CartItems;

  get CartItemsLastId() {
    return this.cartItems.products.length + 1;
  }

  constructor() {
    this.cartItems = new CartItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.cartItems,changes)
    // changes.prop contains the old and the new value...
  }

  onUpdateAmount(){
    this.cartItems.updateTotalAmount();
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
    this.cartItems.updateTotalAmount();

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

  createUniqueString() {
    const date = new Date();
    const dateTime = date.getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    const str =  `fly-${dateTime }-${randomNumber}`;
    return str.substring(0, 20);
  }
  
  CreateOrder(orderId:string):Order{
    console.log(this.cartItems.products);
    const order = new Order();
    order.businessId= environment.BusinessId;
    order.isDeleted= false;
    order.active= true;
    order.customerId= 123;
    order.orderInvoiceNumber= orderId;
    order.orderType= "Dine-In";
    order.orderTableId= 4;
    order.orderStatus= "In-Progress";
    order.orderServiceCharges= 10;
    order.orderDiscount= 20;
    order.orderVoucherId= 2;
    order.orderVoucherDiscountAmount= 5;
    order.orderTotalAmount= this.cartItems.totalAmount;
    order.orderVatAmount = 0;
    order.orderVatPercentage= 0;
    order.vatType= "Regular";
    order.orderPaymentStatus= "Paid";
    order.orderPaymentMethod= "Credit Card";
    order.averageOrderPreprationTime= 30;
    order.orderComments= "Special Request No onions";
    order.orderDeliveryTime= 60;
    order.customerDeliveryId= 987;
    order.orderCompletedBy= ""
    console.log(order);
    return order;
  }

  CreateOrderDetails(orderId:string):OrderDetails[]{
    return this.cartItems.products.map((product:Product) => {
      let orderDetails = new OrderDetails();
      orderDetails.BusinessId = product.businessId;
      orderDetails.CategoryId = product.categoryId;
      orderDetails.OrderId = orderId;
      orderDetails.ProductComments = "";
      orderDetails.ProductHaveSelection = false;
      orderDetails.ProductId = product.productId;
      orderDetails.ProductName = product.productName;
      orderDetails.ProductPrice = product.productDeliveryPrice;
      orderDetails.ProductQuantity = product.quantity;
      orderDetails.VariantId = product.productVariants && product.productVariants.length > 0 ? product.productVariants[0].variantId : 0;
      return orderDetails;
    })
  }


}
