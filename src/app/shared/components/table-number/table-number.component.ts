import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-number',
  templateUrl: './table-number.component.html',
  styleUrls: ['./table-number.component.css']
})
export class TableNumberComponent implements OnInit {


  @Output("tableNumber") tableNumber = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public numberscreen = '';

  public addNumber(num: string) {
    this.numberscreen += num;
  }

  public clearScreen() {
    this.numberscreen = '';
  }

  public removeLast() {
    if (this.numberscreen.length > 0) {
      this.numberscreen = this.numberscreen.slice(0, -1);
    }
  }

  public calculate() {
    try {
      this.numberscreen = eval(this.numberscreen);
      this.tableNumber.emit(this.numberscreen);
    } catch (error) {
      this.numberscreen = 'Error';
    }
  }

}
