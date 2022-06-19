import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/footer/footer.component';
import { NavigationComponent } from './modules/navigation/navigation.component';
import { ProductsComponent } from './modules/products/products.component';
import { ContactComponent } from './modules/contact/contact.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { UserComponent } from './modules/user/user.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './modules/orders/orders.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AddressesComponent } from './modules/addresses/addresses.component';
import { AddEditAddressComponent } from './modules/add-edit-address/add-edit-address.component';
import { OrderDetailsComponent } from './modules/order-details/order-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavigationComponent,
    ProductsComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    OrdersComponent,
    ProfileComponent,
    AddressesComponent,
    AddEditAddressComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
