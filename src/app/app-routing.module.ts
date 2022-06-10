import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { OrderComponent } from './module/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },{
    path: 'products',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
