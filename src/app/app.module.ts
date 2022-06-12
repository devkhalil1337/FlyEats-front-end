import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/home/home.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { OrderComponent } from './module/order/order.component';
import { LoginComponent } from './module/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { ItemsFilterPipe } from './Pips/itemsFilterPipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    OrderComponent,
    LoginComponent,
    ItemsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
