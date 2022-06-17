import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { ProductsComponent } from './modules/products/products.component';
import { RegisterComponent } from './modules/register/register.component';
const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'products',
  component: ProductsComponent
},
{
  path: 'contact-us',
  component: ContactComponent
},
{
  path: 'register',
  component: RegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
