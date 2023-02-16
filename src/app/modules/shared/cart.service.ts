import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { CartItems } from 'src/app/filters/cart-items.model';
import { Product } from 'src/app/filters/product.model';
import { Variants } from 'src/app/filters/variants.model';
import { Order } from 'src/app/models/order.model';
import { OrderDetails } from 'src/app/models/orderDetails.model';
import { OrderVariants } from 'src/app/models/orderVariants.model';
import { AuthService } from 'src/app/user/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItems;

  get CartItemsLastId() {
    return this.cartItems.products.length + 1;
  }

  setCartItems(cartItems:CartItems){
    this.cartItems = cartItems;
  }

  setOrderType(orderType:string){
    const session = JSON.parse(localStorage.getItem("CartInputs") || '{}');
    this.cartItems.orderType = orderType;
    session.orderType = this.cartItems.orderType;
    localStorage.setItem("CartInputs",JSON.stringify(session));
  }

  constructor(private authService:AuthService) {}

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
    const session = JSON.parse(localStorage.getItem("CartInputs") || '{}');
    this.cartItems.products = this.cartItems.products.filter(
      (elm) => elm.cartId != productId
    );
    session.products = this.cartItems.products;
    localStorage.setItem("CartInputs",JSON.stringify(session));
    return this.cartItems.products;
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
  
  CreateOrder(orderId:string,selectedAddress?:number):Order{
    const order = new Order();
    order.businessId = environment.BusinessId;
    order.isDeleted = false;
    order.active = true;
    order.customerId =  this.authService.userId;
    order.orderInvoiceNumber = orderId;
    order.orderType = this.cartItems.orderType;
    order.orderTableId = 0;
    order.orderStatus = "In-Progress";
    order.orderServiceCharges= 0;
    order.orderDiscount = 0;
    order.orderVoucherId = 0;
    order.orderVoucherDiscountAmount= 5;
    order.orderTotalAmount= this.cartItems.totalAmountInclVatDelivery;
    order.orderVatAmount = 0;
    order.orderVatPercentage = 0;
    order.vatType= "Regular";
    order.orderPaymentStatus= "Paid";
    order.orderPaymentMethod= "Credit Card";
    order.averageOrderPreprationTime= 0;
    order.orderComments = "Special Request No onions";
    order.orderDeliveryTime = 60;
    order.customerDeliveryId= selectedAddress || 0;
    order.orderCompletedBy= ""
    order.creationDate = this.getDateTime();
    return order;
  }



  CreateOrderDetails(orderId:string):OrderDetails[]{
    return this.cartItems.products.map((product:Product) => {
      let orderDetails = new OrderDetails();
      orderDetails.BusinessId = product.businessId;
      orderDetails.CategoryId = product.categoryId;
      orderDetails.OrderId = orderId;
      orderDetails.ProductComments = "";
      orderDetails.ProductHaveSelection = product && product.selectionChoices && product.selectionChoices.length > 0;
      orderDetails.ProductId = product.productId;
      orderDetails.ProductName = product.productName;
      orderDetails.ProductPrice = product.productDeliveryPrice;
      orderDetails.ProductQuantity = product.quantity;
      orderDetails.VariantId = product.productVariants && product.productVariants.length > 0 ? product.productVariants[0].variantId : 0;
      orderDetails.productVariants = this.createOrderVariants(product);
      return orderDetails;
    })
  }

  createOrderVariants(product:Product){
    if(product && !product.selectionChoices)
      return [];
    return product.selectionChoices.map((productChoice) => {
      let variant = new OrderVariants();
      variant.businessId = product.businessId;
      variant.choiceName = productChoice.choiceName;
      variant.choicePrice = productChoice.choicePrice;
      variant.choicesId = productChoice.choicesId;
      variant.selectionId = productChoice.selectionId
      return variant;
    })
  }


  private getDateTime():string{
    let currentDate = new Date();
    let dateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1).toString().padStart(2, '0') + "-" + currentDate.getDate().toString().padStart(2, '0') + " " + currentDate.getHours().toString().padStart(2, '0') + ":" + currentDate.getMinutes().toString().padStart(2, '0') + ":" + currentDate.getSeconds().toString().padStart(2, '0');
    return dateString
  }


}
