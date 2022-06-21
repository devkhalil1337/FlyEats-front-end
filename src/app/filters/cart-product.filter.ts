export class Product {
    itemName:string;
    itemDescription:string;
    quantity:number;
    itemPrice:number;

    constructor(product:any){
        this.itemName = product.itemName;
        this.itemDescription = product.description
        this.quantity = product.quantity ?  product.quantity: 1;
        this.itemPrice = product.price;
    }
}