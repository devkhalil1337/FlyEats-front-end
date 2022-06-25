import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { ContactComponent } from '../contact/contact.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { GalleryComponent } from '../gallery/gallery.component';

const routes: Routes = [
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }, {
    path: 'products',
    component: ProductsComponent
  }, {
    path: 'contact-us',
    component: ContactComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'user/orders/:id',
    component: OrderDetailsComponent
  }, {
    path: 'gallery',
    component: GalleryComponent
  }];

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[FooterComponent,NavigationComponent,RouterModule]
})
export class CoreModule { }
