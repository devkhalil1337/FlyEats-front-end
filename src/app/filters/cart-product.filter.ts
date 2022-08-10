export class Product {
    cartId:number;
    productName:string;
    productImage:string;
    itemDescription:string;
    quantity:number;
    productDeliveryPrice:number;

    constructor(product:any){
        this.cartId = product.cartId || product.id
        this.productName = product.productName;
        this.productImage = product.productImageUrl;
        this.itemDescription = product.description
        this.quantity = product.quantity ?  product.quantity: 1;
        this.productDeliveryPrice = product.productDeliveryPrice || 0;
    }
}