import { Injectable} from '@angular/core';
import { PaymentMethods} from 'src/app/enums/PaymentMethodsEnum';
import { Product,Variants,CartItems,Order,OrderDetails,OrderVariants } from '@models';
import { OrderStatus,OrderTypes} from '@enums';
import { AuthService,ConfigService} from '@shared';

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

  constructor(private authService:AuthService,private configService:ConfigService) {}

  onUpdateAmount(){
    this.cartItems.updateTotalAmount();
  }
  
  onQuantityIncrease(product: Product):void{
    product.quantity > 0 ? product.quantity++ : 1;
    product.productPrice = product.deliveryPrice;
  }

  onQuantityDecrease(product: Product):void {
    product.quantity > 1 ? product.quantity-- : 1;
    product.productPrice = product.deliveryPrice;
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
        product.deliveryPrice = selectedVariationProduct.variationPrice;
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
  
  CreateOrder(orderId:string,selectedAddress:number,selectedMethod:string,paymentResponse?:any):Order{
    const order = new Order();
    order.businessId = this.configService.BusinessId;
    order.isDeleted = false;
    order.customerId = this.authService.userId;
    order.orderInvoiceNumber = orderId;
    order.orderType = this.cartItems.orderType;
    order.orderTableId = Number(this.cartItems.tableNumber);
    order.orderStatus = OrderStatus.Open;
    order.serviceChargeAmount = 0;
    order.discountAmount = 0;
    order.voucherId = 0;
    order.voucherDiscountAmount = 0;
    order.totalAmount = this.cartItems.totalAmountInclVatDelivery;
    order.vatAmount = 0;
    order.vatPercentage = 0;
    order.vatType = "Regular";
    order.paymentStatus = selectedMethod == PaymentMethods.CARD ? 'PAID' : 'UNPAID';
    order.paymentMethod = selectedMethod || "Not Selected";
    order.averagePreparationTime = 0;
    order.comments = "Special Request No onions";
    order.deliveryTime = 60;
    order.completedBy = '';
    if(this.cartItems.orderType == OrderTypes.Delivery)
      order.deliveryCharges = this.cartItems.deliveryCharges || 0;
    order.cardPaymentId = paymentResponse?.id ?? '';
    order.customerDeliveryId = selectedAddress || 0;
    order.createdDate = this.getDateTime();
    // order.modifiedDate = this.getDateTime();
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
      orderDetails.ProductPrice = product.deliveryPrice;
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
