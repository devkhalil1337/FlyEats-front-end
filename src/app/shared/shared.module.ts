import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { LazyLoadingDirective } from './lazy-loading.directive';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { CartService } from './cart.service';
import { FeatureProductsPipe } from './pipes/feature-products.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FilterMenuPipe, LazyLoadingDirective, MycurrencyPipe, FeatureProductsPipe, ProductDetailsComponent],
  imports: [
    CommonModule
  ],
  providers:[
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[FilterMenuPipe,LazyLoadingDirective,MycurrencyPipe,FeatureProductsPipe,ProductDetailsComponent]
})
export class SharedModule { }
