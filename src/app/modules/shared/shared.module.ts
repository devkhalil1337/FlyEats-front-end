import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMenuPipe } from './pipes/filter-menu.pipe';



@NgModule({
  declarations: [FilterMenuPipe],
  imports: [
    CommonModule
  ],
  exports:[FilterMenuPipe]
})
export class SharedModule { }
