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
  isTableProduct:boolean;
  productTableVat: number;
  productTablePrice: number; 
  isPickupProduct:boolean;
  productPickupPrice: number;
  productPickupVat: number;
  deliveryPrice: number;
  isDeliveryProduct:boolean;
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
    this.selectionChoices = new Array<SelectionChoices>();
    this.productVariants = new Array<Variants>();
  }
  
}
