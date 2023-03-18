import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent,ProductsComponent,ContactComponent, RegisterComponent,GalleryComponent } from '@modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './user/orders/orders.component';
import { AddEditAddressComponent } from './user/add-edit-address/add-edit-address.component';
import { OrderDetailsComponent } from './user/order-details/order-details.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { ProfileComponent } from './user/profile/profile.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartFilterComponent } from './filters/cart-filter/cart-filter.component';
import { RouterlinkrendererComponent } from '@shared/components/routerlinkrenderer/routerlinkrenderer.component';
import { StripeComponent } from '@shared/stripe/stripe.component';
import { TableNumberComponent } from '@shared/components/table-number/table-number.component';
import { SharedModule } from '@shared/shared.module';
import { HttpInterceptorService } from '@shared/http-interceptor.service';
import { ModalService } from '@shared';
import { CoreModule } from './core/core.module';
import { NavigationComponent } from './core/components/navigation/navigation.component';
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
    GalleryComponent,
    CartFilterComponent,
    RouterlinkrendererComponent,
    StripeComponent,
    TableNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule
  ],
  providers: [NavigationComponent,StripeComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ModalService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
