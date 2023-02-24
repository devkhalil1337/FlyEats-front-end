export class Voucher {
    voucherId: number;
    voucherCode: string;
    minValue: number;
    maxValue: number;
    startDate: Date;
    endDate: Date;
    createdOn?: Date;
    createdBy?: number;
    businessId: number;
    isActive: boolean;
    redeemCount?: number;
  
    constructor(
      voucherId: number,
      voucherCode: string,
      minValue: number,
      maxValue: number,
      startDate: Date,
      endDate: Date,
      createdOn: Date,
      createdBy: number,
      businessId: number,
      isActive: boolean,
      redeemCount: number
    ) {
      this.voucherId = voucherId;
      this.voucherCode = voucherCode;
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.startDate = startDate;
      this.endDate = endDate;
      this.createdOn = createdOn;
      this.createdBy = createdBy;
      this.businessId = businessId;
      this.isActive = isActive;
      this.redeemCount = redeemCount;
    }
  }
  