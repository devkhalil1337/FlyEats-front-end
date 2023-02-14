import { environment } from "src/environments/environment";

export class User {
    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    businessId: number;
    password: string;

    constructor(){
        this.businessId = environment.BusinessId;
    }
}
