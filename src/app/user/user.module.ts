import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/authguard';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from '../modules/user/user.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AddEditAddressComponent } from './add-edit-address/add-edit-address.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: "user",
    children: [
      {
        path: "orders",
        component: OrdersComponent,
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
  ],
  exports:[RouterModule],
  providers:[]
})
export class UserModule { }
