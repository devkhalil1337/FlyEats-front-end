import { AuthService } from "../user/auth/auth.service";

export class Address {
     active: boolean;
     addressId: number;
     addressLine1: string= "";
     addressLine2: string = "";
     addressType: string;
     city: string;
     country: string;
     latitude?: number;
     longitude?: number;
     phoneNumber: string;
     stateProvince: string = "";
     timestamp: string;
     userId: number;
     zipPostalCode: string;

     constructor(){
        this.active = true;
     }
}