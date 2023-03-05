import { Component, OnDestroy, OnInit } from '@angular/core';
import { orders } from 'src/app/mock-api/orders';
import { OrdersService } from './orders.service';
import { GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from '@shared/local-storage.service';
import { RouterlinkrendererComponent } from '@shared/components/routerlinkrenderer/routerlinkrenderer.component';
import { OrderStatus } from '@enums/OrderStatusEnum';

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
    valueGetter: (params: any) => Number(params.node?.rowIndex) + 1,
    maxWidth:100,
  }, {
    headerName: 'Order Number',
    field: 'orderInvoiceNumber',
    cellRenderer:RouterlinkrendererComponent
  }, {
    headerName: 'Status',
    field: 'orderStatus',
    maxWidth:150,
    cellRenderer: (params:any) => {
      switch(params.value.toUpperCase()){
        case OrderStatus.Open:
          return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
        case OrderStatus.OnTheWay:
          return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
        case OrderStatus.Cancelled:
          return `<span class="badge badge-danger p-1 w-100">${params.value.toUpperCase()}</span>`;
        case OrderStatus.Completed:
          return `<span class="badge badge-success p-1 w-100">${params.value.toUpperCase()}</span>`;
        default:
          return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
        }
    }
  }, {
    headerName: 'Total Price',
    field: 'totalAmount',
    valueGetter:(params:any) => {
      const business = this.localStorageService.getBusinessDetails();
      return business.businessCurrency+ '' + params.data.totalAmount
    }
  }, {
    headerName: 'Date',
    field: 'createdDate',
    cellRenderer: (data: any) => {
      return moment(data.data.createdDate).format("MM-DD-YYYY hh:mm:ss a")
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
