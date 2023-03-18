import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ProductsComponent } from '../modules/products/products.component';
import { ContactComponent } from '../modules/contact/contact.component';
import { GalleryComponent } from '../modules/gallery/gallery.component';
import { LoginComponent } from '../modules/login/login.component';
import { MenuComponent } from '../modules/menu/menu.component';
import { RegisterComponent } from '../modules/register/register.component';

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
