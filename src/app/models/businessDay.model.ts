export class BusinessDay {
    businessDaysId: number;
    weekDayName: string;
    businessTimes: BusinessTime[];
    businessId: number;
    createDate: string;
    modifyDate: string;
    isDeleted: boolean;
    active: boolean | null;
  }

  export class BusinessTime {
    businessTimesId: number;
    businessDaysId: number;
    startDate: string;
    endDate: string;
    isDeleted: boolean;
  }