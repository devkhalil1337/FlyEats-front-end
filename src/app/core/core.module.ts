import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ContactComponent, GalleryComponent, LoginComponent, MenuComponent, ProductsComponent, RegisterComponent } from '@modules';

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
