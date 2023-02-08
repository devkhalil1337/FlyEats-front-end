import { SelectionChoices } from './selections.model';
import { Variants } from './variants.model';

export class Product {
  cartId?: number;
  productId: number;
  categoryId: number;
  selectionId: [];
  categoryName: string;
  productImage: string;
  productName: string;
  productDescription: string;
  productTablePrice: number;
  productTableVat: number;
  productPickupPrice: number;
  productPickupVat: number;
  productDeliveryPrice: number;
  productDeliveryVat: number;
  productSortBy: number;
  productQuantity: number;
  hasVariations: boolean;
  featured: boolean;
  productVariants: Array<Variants>;
  businessId: number;
  isDeleted: boolean;
  active: boolean;
  quantity: number = 1;
  productImageUrl?: string;
  isItemsExists?: boolean;
  selectionChoices: Array<SelectionChoices>;
  productPrice: number;
  productTotalAmount:number;
  constructor() {
	this.productPrice = 0;
  }
  
}
