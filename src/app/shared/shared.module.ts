import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { LazyLoadingDirective } from './lazy-loading.directive';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { CartService } from './cart.service';
import { FeatureProductsPipe } from './pipes/feature-products.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



@NgModule({
  declarations: [FilterMenuPipe, LazyLoadingDirective, MycurrencyPipe, FeatureProductsPipe, ProductDetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[FilterMenuPipe,LazyLoadingDirective,MycurrencyPipe,FeatureProductsPipe,ProductDetailsComponent]
})
export class SharedModule { }
