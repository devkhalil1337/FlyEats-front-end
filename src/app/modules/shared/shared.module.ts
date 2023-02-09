import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { LazyLoadingDirective } from './directive/lazy-loading.directive';
import { MycurrencyPipe } from './pipes/mycurrency.pipe';
import { CartService } from './cart.service';



@NgModule({
  declarations: [FilterMenuPipe, LazyLoadingDirective, MycurrencyPipe],
  imports: [
    CommonModule
  ],
  exports:[FilterMenuPipe,LazyLoadingDirective,MycurrencyPipe]
})
export class SharedModule { }
