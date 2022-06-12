import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderService } from './order.service';
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  categoryList:any;
  ItemsList:any;
  modifierItem:any;


  constructor(private orderService:OrderService) {
    this.getCategoriesList();
   }


  ngOnInit(): void {
  }



  
  getCategoriesList(){
    forkJoin(this.orderService.getCategories(), 
    this.orderService.getItems())
     .subscribe(([categoryResponse, ItemsResponse]) => {
        this.categoryList = categoryResponse;
        this.ItemsList = ItemsResponse;
     });
  }


  addToCart(item:any){
    if(item.MenuItem_HaveModifier == 1){
        this.getModifirProduct(item.MenuItemId);
    }
  }

  getModifirProduct(itemId:number){
    this.orderService.getModifierItems(itemId).subscribe(response => {
      this.modifierItem = response;
      setTimeout(function() {
        $.magnificPopup.open({
          items: {
            src: '#test-popup',
            type: 'inline'
          }
        });
      }, 0);

    })
  }



}
