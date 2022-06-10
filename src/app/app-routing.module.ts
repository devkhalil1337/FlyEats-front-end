import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { LoginComponent } from './module/login/login.component';
import { OrderComponent } from './module/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path: 'products',
    component: OrderComponent
  },{
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
