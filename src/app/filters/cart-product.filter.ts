export class Product {
    cartId:number;
    productName:string;
    itemDescription:string;
    quantity:number;
    productDeliveryPrice:number;

    constructor(product:any){
        this.cartId = product.cartId || product.id
        this.productName = product.productName;
        this.itemDescription = product.description
        this.quantity = product.quantity ?  product.quantity: 1;
        this.productDeliveryPrice = product.productDeliveryPrice || 0;
    }
}