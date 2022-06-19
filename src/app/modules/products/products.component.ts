import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/mock-api/category-data';
import { products } from 'src/app/mock-api/product-data';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  categorylist:any[]
  menulist:any[]

  constructor() { 

    this.categorylist = categories
    this.menulist = products

  }

  ngOnInit(): void {
  }




  onScroll(elem: string) {
    const element = document.querySelector(elem)!;
    const y = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
 }

}
