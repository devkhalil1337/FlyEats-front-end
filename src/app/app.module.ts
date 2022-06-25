import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { NavigationComponent } from './modules/core/components/navigation/navigation.component';
import { ProductsComponent } from './modules/products/products.component';
import { ContactComponent } from './modules/contact/contact.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './user/orders/orders.component';
import { AddEditAddressComponent } from './user/add-edit-address/add-edit-address.component';
import { OrderDetailsComponent } from './modules/order-details/order-details.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { ProfileComponent } from './user/profile/profile.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    OrdersComponent,
    AddressesComponent,
    AddEditAddressComponent,
    OrderDetailsComponent,
    CheckoutComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [NavigationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
