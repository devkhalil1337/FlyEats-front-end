import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { ContactComponent } from '../contact/contact.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { MenuComponent } from '../menu/menu.component';

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
    path: 'menu',
    component: MenuComponent
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
    NavigationComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[FooterComponent,NavigationComponent,RouterModule,TabsComponent]
})
export class CoreModule { }
