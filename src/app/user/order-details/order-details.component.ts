import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrderDetailsService } from './order-details.service';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { LocalStorageService } from '@shared/local-storage.service';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  order:any;
  orderDetails:any;

  rowData: any[];
  defaultColDef: any;
  gridOptions: GridOptions;

  constructor(
    private orderDetailsService:OrderDetailsService,
    private activatedRoute: ActivatedRoute,
    private localStorageService:LocalStorageService
    ) { 
      this.getOrderDetails();

    // Initialize row data and column definitions
    this.gridOptions = {
      // other grid options...
      animateRows: true,
    };
 
    this.defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
      height: 'auto',
    };

  }

  
  ngOnInit(): void {
  }


  getOrderDetails(){
    const orderId = (this.activatedRoute.snapshot.paramMap.get('id') as string);
    if(!orderId){
      return;
    }
    forkJoin(
      this.orderDetailsService.getOrders(orderId),
      this.orderDetailsService.getOrdersDetails(orderId)
    ).subscribe(([orderResponse, orderDetailsResponse]) => {
      this.order = orderResponse;
      this.orderDetails = orderDetailsResponse;
      this.flattenData();
    });
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
  },
  { field: 'productName', headerName: 'Item' },
  { field: 'productQuantity', headerName: 'Quantity' },
  { field: 'productPrice', headerName: 'Price',
   valueGetter:(params:any) => {
      const business = this.localStorageService.getBusinessDetails();
      return business.businessCurrency+ '' + params.data.productPrice
    }
},
  { field: 'productTotal', headerName: 'Total',
  valueGetter:(params:any) => {
    
     const business = this.localStorageService.getBusinessDetails();
     return params.data.productTotal ?  business.businessCurrency+ '' + params.data.productTotal : ''
   } },
  //  {
  //   headerName: 'Order Number',
  //   field: 'orderInvoiceNumber',
  //   cellRenderer:RouterlinkrendererComponent
  // }, {
  //   headerName: 'Status',
  //   field: 'orderStatus',
  //   maxWidth:150,
  //   cellRenderer: (params:any) => {
  //     switch(params.value.toUpperCase()){
  //       case OrderStatus.Open:
  //         return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
  //       case OrderStatus.OnTheWay:
  //         return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
  //       case OrderStatus.Cancelled:
  //         return `<span class="badge badge-danger p-1 w-100">${params.value.toUpperCase()}</span>`;
  //       case OrderStatus.Completed:
  //         return `<span class="badge badge-success p-1 w-100">${params.value.toUpperCase()}</span>`;
  //       default:
  //         return `<span class="badge badge-primary p-1 w-100">${params.value.toUpperCase()}</span>`;
  //       }
  //   }
  // }, 
  // {
  //   headerName: 'Payment Method',
  //   field: 'paymentMethod'
  // }, {
  //   headerName: 'Total Price',
  //   field: 'totalAmount',
  //   valueGetter:(params:any) => {
  //     const business = this.localStorageService.getBusinessDetails();
  //     return business.businessCurrency+ '' + params.data.totalAmount
  //   }
  // }, {
  //   headerName: 'Date',
  //   field: 'createdDate',
  //   cellRenderer: (data: any) => {
  //     return moment(data.data.createdDate).format("MM-DD-YYYY hh:mm:ss a")
  //   }
  // }
]



  flattenData() {
    const flattenedData: any[] = [];
  
    this.orderDetails?.forEach((row: { productName: any; productPrice: any; productQuantity:any; productVariants: { choiceName: any; choicePrice: any; }[]; }) => {
      const parentPrice = row.productPrice;
      let parentTotal = parentPrice;
  
      const flattenedParentRow = {
        productName: row.productName,
        productPrice: parentPrice,
        productQuantity:row.productQuantity,
        productTotal: parentTotal,
      };
  
      flattenedData.push(flattenedParentRow);
  
      row.productVariants?.forEach((variant: { choiceName: any; choicePrice: any; }) => {
        const variantPrice = variant.choicePrice;
        const variantTotal = variantPrice;
  
        const variantRow = {
          productName: "- " + variant.choiceName,
          productPrice: variantPrice,
          // productTotal: variantTotal,
        };
  
        flattenedData.push(variantRow);
  
        parentTotal += variantTotal;
      });
  
      flattenedParentRow.productTotal = parentTotal;
    });
  
    this.rowData = flattenedData;
  }
  
  
  

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
    this.adjustGridHeight();
  }

  ngAfterViewInit() {
    this.adjustGridHeight();
  }



  adjustGridHeight() {
    const rowCount = this.orderDetails?.length;
    const rowHeight = 30; // Specify the height of a single row in pixels
    const headerHeight = 30; // Specify the height of the header row in pixels
  
    const totalGridHeight = rowCount * rowHeight + headerHeight;
    this.gridOptions.api?.setDomLayout('autoHeight');
    // this.gridOptions.api?.setGridHeight(totalGridHeight);
  }
  

}
