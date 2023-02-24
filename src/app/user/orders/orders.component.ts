import { Component, OnDestroy, OnInit } from '@angular/core';
import { orders } from 'src/app/mock-api/orders';
import { OrdersService } from './orders.service';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/modules/shared/local-storage.service';
import { RouterlinkrendererComponent } from 'src/app/shared/components/routerlinkrenderer/routerlinkrenderer.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  private statusSubscription: Subscription;
  ordersList:any[]
  public gridOptions: GridOptions;
  constructor(private ordersService:OrdersService,private localStorageService:LocalStorageService) {
    this.onFetchAllOrdersList();
    this.initilizeAGGrid();
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.statusSubscription.unsubscribe();
  }

  initilizeAGGrid(){
    this.gridOptions = {
      columnDefs: this.columnDefs,
      pagination: true,
      paginationPageSize:10,
      onGridReady(event) {
        event.api.sizeColumnsToFit();
      },
    };
  }

  columnDefs = [{
    headerName: '#',
    field: '',
    valueGetter: (params: any) => Number(params.node?.rowIndex) + 1
  }, {
    headerName: 'Order Number',
    field: 'orderInvoiceNumber',
    cellRenderer:RouterlinkrendererComponent
  }, {
    headerName: 'Status',
    field: 'orderStatus'
  }, {
    headerName: 'Total Price',
    field: 'orderTotalAmount',
    valueGetter:(params:any) => {
      const business = this.localStorageService.getBusinessDetails();
      return business.businessCurrency+ '' + params.data.orderTotalAmount
    }
  }, {
    headerName: 'Date',
    field: 'creationDate',
    cellRenderer: (data: any) => {
      return moment(data.data.creationDate).format('MMM d, y, h:mm:ss a')
    }
  }]


  onFetchAllOrdersList(){
    this.ordersService.getOrdersList().subscribe(response => {
      this.gridOptions.api?.setRowData(response);
      this.ordersList = response;
      this.checkOrderStatus();
    })
  }


  checkOrderStatus(){
    this.statusSubscription = interval(15000) // Check every 15 seconds
    .pipe(
      switchMap(() => this.ordersService.getOrdersList())
    )
    .subscribe(response => {
      this.gridOptions.api?.setRowData(response);
    });

  }

}
