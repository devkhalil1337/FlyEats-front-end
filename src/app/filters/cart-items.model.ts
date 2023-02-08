import { Product } from './product.model';
import { SelectionChoices } from './selections.model';
import { Variants } from './variants.model';

export class CartItems {
  cartItemId: number;
  products: Array<Product>;
  selections: Array<SelectionChoices>;
  totalAmount: number = 0;
  deliveryCharges: number = 0;
  minimumOrder: number = 0;

  constructor() {
    this.products = new Array<Product>();
    this.selections = new Array<SelectionChoices>();
    this.getDeliveryCharges();
    this.updateTotalAmount();
  }

  getProducts() {
    console.log(this.products);
  }

  updateTotalAmount() {
    this.totalAmount = 0;
    this.products.forEach((product: Product) => {
      if (product.selectionChoices && product.selectionChoices.length > 0) {
        product.selectionChoices.forEach((choice: SelectionChoices) => {
          if (choice.checked) {
            this.totalAmount += choice.choicePrice;
          }
        });
      }
      if (product.productVariants && product.productVariants.length > 0) {
        product.productVariants.forEach((variant: Variants) => {
          if (variant.checked) {
            this.totalAmount += variant.variationPrice;
          }
        });
      }

      if(product.productVariants.length == 0){
        this.totalAmount += product.productPrice * product.quantity;
      }

    });
  }

  private getDeliveryCharges() {
    const business = JSON.parse(
      localStorage.getItem('businessSettings') || '{}'
    );
    this.deliveryCharges = business.deliveryCharges || 0;
  }
}
