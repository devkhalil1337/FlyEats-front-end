import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-number',
  templateUrl: './table-number.component.html',
  styleUrls: ['./table-number.component.css']
})
export class TableNumberComponent implements OnInit {
  @Input("tableNumber") selectedNumber:string;
  @Output("tableNumber") tableNumber = new EventEmitter();
  @Input() modelRef:any

  numberscreen = '';


  constructor() { }

  ngOnInit(): void {
    this.numberscreen = this.selectedNumber == '0' ? '1': String(this.selectedNumber);
  }


  addNumber(num: string) {
    this.numberscreen += num;
  }

  clearScreen() {
    this.numberscreen = '';
  }

  removeLast() {
    if (this.numberscreen.length > 0) {
      this.numberscreen = this.numberscreen.slice(0, -1);
      if(this.numberscreen.length == 0){
        this.numberscreen = '1'
      }
    }

  }

  calculate() {
    try {
      let number = String(Number(this.numberscreen))
      this.numberscreen = eval(this.numberscreen);
      this.tableNumber.emit(this.numberscreen);
    } catch (error) {
      this.numberscreen = 'Error';
    }
    this.onModalDismiss();
  }

  onModalDismiss() {
    this.modelRef.close();
  }

}
