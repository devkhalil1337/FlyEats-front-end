export class Business {
    name:string;
    address:string;
    city:string;
    currency:string;
    country:string;
    email:string;
    phone:string;
    icon:string;

    constructor(business:any){
        this.name = business.RestName;
        this.address = business.CompAddress;
        this.city = business.CompCity;
        this.country = business.CompCountry;
        this.currency = business.CompCurrency;
        this.email = business.CompEmail;
        this.phone = business.CompPhone;
        this.icon = business.CompIcon;
    }

//     CompAddress: "268 Bath Road SL1 4DX"
// CompCity: ""
// CompCountry: "Pakistan"
// CompCurrency: "£"
// CompDetails: "hhjsdsd"
// CompEmail: "sales@jempos.co.uk"
// CompID: 30
// CompIcon: "30_iconsite-logo-new.png"
// CompLatitude: "0"
// CompLongitude: "0"
// CompPhone: "03216905697"
// DeliveryCharges: 0
// DeliveryTime: 40
// ISWebApp: true
// IsMobileApp: true
// MinOrderAmount: "10"
// RestName: "PFC Demo"
// S_VARType: "Inclusive"
// S_VAT: "20"
// hasMobileAppExpired: false
// hasWebAppExipred: false
// idguestordering: "True"
// publicKey: "pk_test_Wfq5Log4bnaJdcEJb7kYFuFf"
}