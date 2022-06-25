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
import { OrdersComponent } from './user/orders/orders.component';
import { AddEditAddressComponent } from './user/add-edit-address/add-edit-address.component';
import { OrderDetailsComponent } from './modules/order-details/order-details.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { GalleryComponent } from './modules/gallery/gallery.component';
import { UserModule } from './user/user.module';
import { AddressesComponent } from './user/addresses/addresses.component';
import { ProfileComponent } from './user/profile/profile.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';
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
    ProfileComponent,
    OrdersComponent,
    AddressesComponent,
    AddEditAddressComponent,
    OrderDetailsComponent,
    CheckoutComponent,
    FilterMenuPipe,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [NavigationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
