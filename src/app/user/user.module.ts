import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { StripeComponent } from '@shared/stripe/stripe.component';

const routes: Routes = [
  {
    path: "user",
    children: [
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailsComponent
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "addresses",
        component: AddressesComponent,
      },
      {
        path: "address/add",
        component: AddEditAddressComponent,
      },
    ],
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([])
  ],
  exports:[RouterModule],
  providers:[StripeComponent]
})
export class UserModule { }
