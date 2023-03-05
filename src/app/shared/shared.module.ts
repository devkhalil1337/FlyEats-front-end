import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { LazyLoadingDirective } from './lazy-loading.directive';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { CartService } from './cart.service';
import { FeatureProductsPipe } from './pipes/feature-products.pipe';



@NgModule({
  declarations: [FilterMenuPipe, LazyLoadingDirective, MycurrencyPipe, FeatureProductsPipe],
  imports: [
    CommonModule
  ],
  exports:[FilterMenuPipe,LazyLoadingDirective,MycurrencyPipe,FeatureProductsPipe]
})
export class SharedModule { }
