export class Order {
    orderId?: number;
    businessId: number;
    customerId: number;
    orderInvoiceNumber: string;
    orderType: string;
    orderTableId: number;
    orderStatus: string;
    serviceChargeAmount: number;
    discountAmount: number;
    voucherId: number;
    voucherDiscountAmount: number;
    totalAmount: number;
    vatAmount: number;
    vatPercentage: number;
    vatType: string;
    paymentStatus: string;
    paymentMethod: string;
    averagePreparationTime: number;
    comments: string;
    deliveryTime: number;
    customerDeliveryId: number;
    completedBy: string;
    deliveryCharges: number;
    cardPaymentId: string;
    createdDate?: string;
    modifiedDate?: Date;
    isDeleted: boolean;
    constructor(){
        this.vatPercentage = 0;
        this.customerId = 0;
        this.deliveryCharges = 0;
    }
}