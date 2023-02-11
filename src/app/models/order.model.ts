import { OrderDetails } from "./orderDetails.model";

export class Order {
    businessId: number;
    isDeleted: boolean;
    active: boolean;
    customerId: number;
    orderInvoiceNumber: string;
    orderType: string;
    orderTableId: number;
    orderStatus: string;
    orderServiceCharges: number;
    orderDiscount: number;
    orderVoucherId: number;
    orderVoucherDiscountAmount: number;
    orderTotalAmount: number;
    orderVatAmount: number;
    orderVatPercentage: number;
    vatType: string;
    orderPaymentStatus: string;
    orderPaymentMethod: string;
    averageOrderPreprationTime: number;
    orderComments: string;
    orderDeliveryTime: number;
    customerDeliveryId: number;
    orderCompletedBy: string;
    OrderDetails: OrderDetails[]
    
    constructor(){}
}