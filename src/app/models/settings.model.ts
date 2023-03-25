export class Settings {
    settingsId: number;
    registerNumber: string;
    vat: number;
    vatType: string;
    serviceCharges: number;
    deliveryCharges: number;
    minimumOrder: number;
    averagePrepareTime: number;
    deliveryTime: number;
    isGuestLoginActive: boolean;
    isDeliveryOrderActive: boolean;
    isCollectionOrderActive: boolean;
    isTableOrderActive: boolean;
    businessId: number;
    createDate: string;
    modifyDate: string;
    isDeleted: boolean | null;
    active: boolean | null;
  
    constructor() {}
  }
  