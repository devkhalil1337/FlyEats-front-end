export class Product{
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
	productVariants: [];
	businessId: number;
	isDeleted: boolean;
	active: boolean;
    quantity?:number;
	productImageUrl?:string;
	isItemsExists?:boolean;
}