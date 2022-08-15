import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';
import { LazyLoadingDirective } from './directive/lazy-loading.directive';



@NgModule({
  declarations: [FilterMenuPipe, LazyLoadingDirective],
  imports: [
    CommonModule
  ],
  exports:[FilterMenuPipe,LazyLoadingDirective]
})
export class SharedModule { }
